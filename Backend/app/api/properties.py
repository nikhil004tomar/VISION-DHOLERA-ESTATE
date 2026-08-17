from fastapi import (
    APIRouter,
    Depends,
    UploadFile,
    File,
    HTTPException,
    Query,
)
from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.core.database import get_db
from app.core.dependencies import get_current_admin

from app.models.admin import Admin
from app.models.property import Property
from app.schemas.property import PropertyCreate

from pathlib import Path
from uuid import uuid4
import shutil


# ============================================================
# ROUTER
# ============================================================

router = APIRouter(
    prefix="/api/properties",
    tags=["Properties"],
)


# ============================================================
# UPLOAD DIRECTORY
# ============================================================

# properties.py
#      ↓
# app/api/properties.py
#
# parents[0] = app/api
# parents[1] = app
#
# Therefore:
#
# backend/app/uploads/properties

BASE_DIR = Path(__file__).resolve().parents[1]

UPLOAD_DIR = BASE_DIR / "uploads" / "properties"

UPLOAD_DIR.mkdir(
    parents=True,
    exist_ok=True,
)


# ============================================================
# HELPER
# ============================================================

def property_to_dict(property: Property):
    """
    Return a clean JSON response.

    The image remains:
        /uploads/properties/filename.jpg

    Frontend will convert this into:
        http://localhost:8000/uploads/properties/filename.jpg
    """

    return {
        "id": property.id,
        "title": property.title,
        "slug": property.slug,
        "location": property.location,
        "price": property.price,
        "property_type": property.property_type,
        "description": property.description,
        "featured": property.featured,
        "status": property.status,
        "image": property.image,
        "area": property.area,
        "possession": property.possession,
        "meta_title": property.meta_title,
        "meta_description": property.meta_description,
        "keywords": property.keywords,
        "created_at": property.created_at,
    }


# ============================================================
# CREATE PROPERTY
# ============================================================

@router.post("/")
def create_property(
    data: PropertyCreate,
    db: Session = Depends(get_db),
    admin: Admin = Depends(get_current_admin),
):
    existing = (
        db.query(Property)
        .filter(Property.slug == data.slug)
        .first()
    )

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Slug already exists.",
        )

    property = Property(
        **data.model_dump()
    )

    db.add(property)
    db.commit()
    db.refresh(property)

    return property_to_dict(property)


# ============================================================
# ADMIN GET ALL
# ============================================================

@router.get("/")
def all_properties(
    db: Session = Depends(get_db),
    admin: Admin = Depends(get_current_admin),
):
    properties = (
        db.query(Property)
        .order_by(
            Property.featured.desc(),
            Property.created_at.desc(),
        )
        .all()
    )

    return [
        property_to_dict(property)
        for property in properties
    ]


# ============================================================
# PUBLIC GET ALL
# ============================================================

@router.get("/public")
def public_properties(
    search: str | None = Query(default=None),
    db: Session = Depends(get_db),
):
    query = (
        db.query(Property)
        .filter(Property.status == True)
    )

    if search:
        search_value = f"%{search}%"

        query = query.filter(
            or_(
                Property.title.ilike(search_value),
                Property.location.ilike(search_value),
                Property.property_type.ilike(search_value),
            )
        )

    properties = (
        query
        .order_by(
            Property.featured.desc(),
            Property.created_at.desc(),
        )
        .all()
    )

    return [
        property_to_dict(property)
        for property in properties
    ]


# ============================================================
# PUBLIC FEATURED
# ============================================================

@router.get("/public/featured")
def featured_properties(
    db: Session = Depends(get_db),
):
    properties = (
        db.query(Property)
        .filter(
            Property.status == True,
            Property.featured == True,
        )
        .order_by(
            Property.created_at.desc()
        )
        .all()
    )

    return [
        property_to_dict(property)
        for property in properties
    ]


# ============================================================
# PUBLIC SINGLE PROPERTY
# ============================================================

@router.get("/public/{slug}")
def property_by_slug(
    slug: str,
    db: Session = Depends(get_db),
):
    property = (
        db.query(Property)
        .filter(
            Property.slug == slug,
            Property.status == True,
        )
        .first()
    )

    if not property:
        raise HTTPException(
            status_code=404,
            detail="Property not found",
        )

    return property_to_dict(property)


# ============================================================
# ADMIN SINGLE PROPERTY
# ============================================================

@router.get("/{id}")
def single_property(
    id: int,
    db: Session = Depends(get_db),
    admin: Admin = Depends(get_current_admin),
):
    property = (
        db.query(Property)
        .filter(Property.id == id)
        .first()
    )

    if not property:
        raise HTTPException(
            status_code=404,
            detail="Property not found",
        )

    return property_to_dict(property)


# ============================================================
# UPDATE PROPERTY
# ============================================================

@router.put("/{id}")
def update_property(
    id: int,
    data: PropertyCreate,
    db: Session = Depends(get_db),
    admin: Admin = Depends(get_current_admin),
):
    property = (
        db.query(Property)
        .filter(Property.id == id)
        .first()
    )

    if not property:
        raise HTTPException(
            status_code=404,
            detail="Property not found",
        )

    duplicate = (
        db.query(Property)
        .filter(
            Property.slug == data.slug,
            Property.id != id,
        )
        .first()
    )

    if duplicate:
        raise HTTPException(
            status_code=400,
            detail="Slug already exists.",
        )

    update_data = data.model_dump()

    for key, value in update_data.items():
        setattr(property, key, value)

    db.commit()
    db.refresh(property)

    return property_to_dict(property)


# ============================================================
# DELETE PROPERTY
# ============================================================

@router.delete("/{id}")
def delete_property(
    id: int,
    db: Session = Depends(get_db),
    admin: Admin = Depends(get_current_admin),
):
    property = (
        db.query(Property)
        .filter(Property.id == id)
        .first()
    )

    if not property:
        raise HTTPException(
            status_code=404,
            detail="Property not found",
        )

    # Delete image from disk
    if property.image:

        filename = Path(
            property.image
        ).name

        image_path = (
            UPLOAD_DIR / filename
        )

        if image_path.exists():
            try:
                image_path.unlink()
            except Exception as error:
                print(
                    f"Could not delete image: {error}"
                )

    db.delete(property)
    db.commit()

    return {
        "success": True,
        "message": "Property deleted successfully",
    }


# ============================================================
# UPLOAD PROPERTY IMAGE
# ============================================================

@router.post("/{property_id}/image")
def upload_property_image(
    property_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    admin: Admin = Depends(get_current_admin),
):
    # Find property
    property = (
        db.query(Property)
        .filter(Property.id == property_id)
        .first()
    )

    if not property:
        raise HTTPException(
            status_code=404,
            detail="Property not found",
        )

    # Check file type
    if not file.content_type:
        raise HTTPException(
            status_code=400,
            detail="Invalid image file.",
        )

    if not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail="Only image files are allowed.",
        )

    # Get extension safely
    original_filename = (
        file.filename or ""
    )

    extension = (
        Path(original_filename)
        .suffix
        .lower()
    )

    allowed_extensions = {
        ".jpg",
        ".jpeg",
        ".png",
        ".webp",
        ".avif",
    }

    if extension not in allowed_extensions:
        raise HTTPException(
            status_code=400,
            detail=(
                "Unsupported image format. "
                "Use JPG, JPEG, PNG, WEBP or AVIF."
            ),
        )

    # Create unique filename
    filename = (
        f"{uuid4()}{extension}"
    )

    filepath = (
        UPLOAD_DIR / filename
    )

    # Save new image
    try:
        with filepath.open("wb") as buffer:
            shutil.copyfileobj(
                file.file,
                buffer,
            )
    except Exception as error:

        if filepath.exists():
            filepath.unlink()

        raise HTTPException(
            status_code=500,
            detail=f"Could not save image: {error}",
        )

    # Delete old image
    if property.image:

        old_filename = Path(
            property.image
        ).name

        old_path = (
            UPLOAD_DIR / old_filename
        )

        if (
            old_path.exists()
            and old_path != filepath
        ):
            try:
                old_path.unlink()
            except Exception as error:
                print(
                    f"Could not delete old image: {error}"
                )

    # Save URL in database
    property.image = (
        f"/uploads/properties/{filename}"
    )

    db.commit()
    db.refresh(property)

    return {
        "success": True,
        "message": "Image uploaded successfully",
        "image": property.image,
        "property": property_to_dict(property),
    }
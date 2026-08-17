import os
import shutil
from uuid import uuid4

from fastapi import (
    APIRouter,
    Depends,
    UploadFile,
    File,
    Form,
    HTTPException,
)
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_admin

from app.models.gallery import Gallery
from app.models.admin import Admin

router = APIRouter(
    prefix="/api/gallery",
    tags=["Gallery"],
)

UPLOAD_DIR = "app/uploads/gallery"
os.makedirs(UPLOAD_DIR, exist_ok=True)


# ==========================
# Get All Gallery Images
# ==========================
@router.get("/")
def get_gallery(
    db: Session = Depends(get_db),
    admin: Admin = Depends(get_current_admin),
):
    return (
        db.query(Gallery)
        .order_by(Gallery.id.desc())
        .all()
    )


# ==========================
# Upload Gallery Image
# ==========================
@router.post("/")
def upload_gallery_image(
    title: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    admin: Admin = Depends(get_current_admin),
):
    if not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail="Only image files are allowed."
        )

    extension = file.filename.split(".")[-1]
    filename = f"{uuid4()}.{extension}"

    filepath = os.path.join(UPLOAD_DIR, filename)

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    gallery = Gallery(
        title=title,
        image=f"/uploads/gallery/{filename}",
    )

    db.add(gallery)
    db.commit()
    db.refresh(gallery)

    return gallery



#@router.get("/public")
#def public_gallery(db: Session = Depends(get_db)):
    return (
        db.query(Gallery)
        .order_by(Gallery.id.desc())
        .all()
    )

@router.get("/public")
def public_gallery(db: Session = Depends(get_db)):
    return (
        db.query(Gallery)
        .filter(Gallery.status == True)
        .order_by(Gallery.id.desc())
        .all()
    )
# ==========================
# Delete Gallery Image
# ==========================
@router.delete("/{id}")
def delete_gallery(
    id: int,
    db: Session = Depends(get_db),
    admin: Admin = Depends(get_current_admin),
):
    gallery = (
        db.query(Gallery)
        .filter(Gallery.id == id)
        .first()
    )

    if not gallery:
        raise HTTPException(
            status_code=404,
            detail="Image not found"
        )

    if gallery.image:
        path = "app" + gallery.image

        if os.path.exists(path):
            os.remove(path)

    db.delete(gallery)
    db.commit()

    return {
        "message": "Image deleted successfully"
    }
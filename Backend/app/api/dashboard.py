from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_admin
from app.core.database import get_db

from app.models.admin import Admin
from app.models.property import Property
from app.models.inquiry import Inquiry
from app.models.gallery import Gallery


router = APIRouter(
    prefix="/api/dashboard",
    tags=["Dashboard"]
)


@router.get("/me")
def me(
    admin: Admin = Depends(get_current_admin)
):
    return {
        "id": admin.id,
        "name": admin.name,
        "email": admin.email
    }


@router.get("/stats")
def dashboard_stats(
    db: Session = Depends(get_db),
    admin: Admin = Depends(get_current_admin)
):
    return {
        "properties": db.query(Property).count(),
        "inquiries": db.query(Inquiry).count(),
        "gallery": db.query(Gallery).count(),
        "active_properties": (
            db.query(Property)
            .filter(Property.status == True)
            .count()
        )
    }
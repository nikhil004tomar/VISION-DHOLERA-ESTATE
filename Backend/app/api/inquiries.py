from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr

from app.core.database import get_db
from app.core.dependencies import get_current_admin
from app.models.inquiry import Inquiry


router = APIRouter(
    prefix="/api/inquiries",
    tags=["Inquiries"],
)


# =========================================================
# SCHEMA
# =========================================================

class InquiryCreate(BaseModel):
    name: str
    email: str
    phone: str
    message: str


# =========================================================
# PUBLIC - CREATE INQUIRY
# =========================================================

@router.post("/public")
def create_inquiry(
    data: InquiryCreate,
    db: Session = Depends(get_db),
):
    inquiry = Inquiry(
        name=data.name.strip(),
        email=data.email.strip(),
        phone=data.phone.strip(),
        message=data.message.strip(),
    )

    db.add(inquiry)
    db.commit()
    db.refresh(inquiry)

    return {
        "success": True,
        "message": "Inquiry submitted successfully.",
        "id": inquiry.id,
    }


# =========================================================
# ADMIN - GET ALL INQUIRIES
# =========================================================

@router.get("")
def all_inquiries(
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin),
):
    inquiries = (
        db.query(Inquiry)
        .order_by(Inquiry.id.desc())
        .all()
    )

    return inquiries


# =========================================================
# ADMIN - UPDATE STATUS
# =========================================================

@router.put("/{id}/status")
def update_status(
    id: int,
    status: str,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin),
):
    inquiry = (
        db.query(Inquiry)
        .filter(Inquiry.id == id)
        .first()
    )

    if not inquiry:
        raise HTTPException(
            status_code=404,
            detail="Inquiry not found",
        )

    inquiry.status = status

    db.commit()
    db.refresh(inquiry)

    return inquiry


# =========================================================
# ADMIN - DELETE
# =========================================================

@router.delete("/{id}")
def delete_inquiry(
    id: int,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin),
):
    inquiry = (
        db.query(Inquiry)
        .filter(Inquiry.id == id)
        .first()
    )

    if not inquiry:
        raise HTTPException(
            status_code=404,
            detail="Inquiry not found",
        )

    db.delete(inquiry)
    db.commit()

    return {
        "success": True,
        "message": "Inquiry deleted successfully",
    }
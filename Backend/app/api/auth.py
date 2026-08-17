from fastapi import APIRouter, HTTPException, Depends, Response, Request
from sqlalchemy.orm import Session

from app.schemas.auth import LoginRequest
from app.core.database import get_db
from app.models.admin import Admin
from app.core.security import verify_password
from app.core.auth import create_access_token


router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"]
)


@router.post("/login")
def login(
    request: LoginRequest,
    response: Response,
    db: Session = Depends(get_db)
):
    admin = (
        db.query(Admin)
        .filter(Admin.email == request.email)
        .first()
    )

    # Generic authentication error
    if not admin or not verify_password(
        request.password,
        admin.password_hash
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    # Create JWT
    token = create_access_token({
        "sub": str(admin.id),
        "email": admin.email
    })

    # Store JWT inside HttpOnly cookie
    response.set_cookie(
        key="admin_session",
        value=token,
        httponly=True,
        secure=False,       # Change to True when using HTTPS
        samesite="lax",
        max_age=30 * 60,    # 30 minutes
        path="/",
    )

    return {
        "success": True,
        "admin": {
            "id": admin.id,
            "name": admin.name,
            "email": admin.email,
        }
    }


@router.post("/logout")
def logout(
    response: Response
):
    # Remove authentication cookie
    response.delete_cookie(
        key="admin_session",
        path="/",
    )

    return {
        "success": True,
        "message": "Logged out successfully"
    }
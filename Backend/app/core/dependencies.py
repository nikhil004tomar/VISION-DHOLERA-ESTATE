from fastapi import Depends, HTTPException, Cookie
from sqlalchemy.orm import Session

from app.core.auth import verify_token
from app.core.database import get_db
from app.models.admin import Admin


def get_current_admin(
    admin_session: str | None = Cookie(default=None),
    db: Session = Depends(get_db)
):
    # Get JWT from the HttpOnly admin_session cookie
    if not admin_session:
        raise HTTPException(
            status_code=401,
            detail="Authentication required"
        )

    # Verify JWT
    payload = verify_token(admin_session)

    if payload is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired session"
        )

    # Get admin ID from JWT
    try:
        admin_id = int(payload["sub"])
    except (KeyError, ValueError, TypeError):
        raise HTTPException(
            status_code=401,
            detail="Invalid session"
        )

    # Find admin in database
    admin = (
        db.query(Admin)
        .filter(Admin.id == admin_id)
        .first()
    )

    if admin is None:
        raise HTTPException(
            status_code=401,
            detail="Admin not found"
        )

    return admin
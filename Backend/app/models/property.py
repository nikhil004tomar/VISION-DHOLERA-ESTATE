from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    Boolean,
    DateTime,
)
from sqlalchemy.sql import func

from app.core.database import Base


class Property(Base):
    __tablename__ = "properties"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    title = Column(
        String(255),
        nullable=False,
    )

    slug = Column(
        String(255),
        unique=True,
        nullable=False,
    )

    location = Column(
        String(255),
        nullable=False,
    )

    price = Column(
        String(100),
        nullable=False,
    )

    property_type = Column(
        String(100),
        nullable=False,
    )

    description = Column(
        Text,
        nullable=False,
    )

    image = Column(
        String(255),
        nullable=True,
    )

    # ==========================
    # Admin Options
    # ==========================

    featured = Column(
        Boolean,
        default=False,
        nullable=False,
    )

    status = Column(
        Boolean,
        default=True,
        nullable=False,
    )

    # ==========================
    # SEO
    # ==========================

    meta_title = Column(
        String(255),
        nullable=True,
    )

    meta_description = Column(
        Text,
        nullable=True,
    )

    keywords = Column(
        String(500),
        nullable=True,
    )

    # ==========================
    # Extra Information
    # ==========================

    area = Column(
        String(100),
        nullable=True,
    )

    possession = Column(
        String(100),
        nullable=True,
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )
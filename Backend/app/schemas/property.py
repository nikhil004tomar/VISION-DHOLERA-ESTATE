from typing import Optional

from pydantic import BaseModel


class PropertyCreate(BaseModel):
    title: str
    slug: str
    location: str
    price: str
    property_type: str
    description: str

    featured: bool = False
    status: bool = True

    image: Optional[str] = None

    # SEO
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None
    keywords: Optional[str] = None

    # Extra
    area: Optional[str] = None
    possession: Optional[str] = None


class PropertyResponse(BaseModel):
    id: int

    title: str
    slug: str
    location: str
    price: str
    property_type: str
    description: str

    featured: bool
    status: bool

    image: Optional[str]

    meta_title: Optional[str]
    meta_description: Optional[str]
    keywords: Optional[str]

    area: Optional[str]
    possession: Optional[str]

    class Config:
        from_attributes = True
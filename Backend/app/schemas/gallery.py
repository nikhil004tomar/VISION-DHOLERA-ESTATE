from pydantic import BaseModel


class GalleryCreate(BaseModel):
    title: str
    description: str | None = None
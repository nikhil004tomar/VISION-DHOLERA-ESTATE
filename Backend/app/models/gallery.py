from sqlalchemy import Column,Integer,String,DateTime
from sqlalchemy.sql import func
from app.core.database import Base

from app.core.database import Base

class Gallery(Base):

    __tablename__="gallery"

    id=Column(Integer,primary_key=True,index=True)

    title=Column(String(200))

    image=Column(String(255))

    created_at=Column(DateTime(timezone=True),server_default=func.now())
from sqlalchemy import Column,Integer,String,Text,DateTime
from sqlalchemy.sql import func

from app.core.database import Base

class Inquiry(Base):

    __tablename__="inquiries"

    id=Column(Integer,primary_key=True,index=True)

    name=Column(String(100))

    email=Column(String(100))

    phone=Column(String(20))

    message=Column(Text)

    status=Column(String(20),default="New")

    created_at=Column(DateTime(timezone=True),server_default=func.now())
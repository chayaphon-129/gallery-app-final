# Dockerfile สำหรับ Frontend
FROM node:14

# สร้างไดเรกทอรีสำหรับแอป
WORKDIR /usr/src/app

# คัดลอก package.json และ package-lock.json
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกโค้ดทั้งหมดไปยัง container
COPY . .

# สร้างแอปสำหรับ production
RUN npm run build

# ติดตั้ง serve เพื่อเสิร์ฟแอป
RUN npm install -g serve

# เปิดพอร์ตที่แอปจะรัน
EXPOSE 3000

# คำสั่งเพื่อเสิร์ฟแอป
CMD ["serve", "-s", "build"]
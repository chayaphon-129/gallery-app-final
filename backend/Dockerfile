# Dockerfile สำหรับ Backend
FROM node:14

# สร้างไดเรกทอรีสำหรับแอป
WORKDIR /usr/src/app

# คัดลอก package.json และ package-lock.json
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกโค้ดทั้งหมดไปยัง container
COPY . .

# เปิดพอร์ตที่แอปจะรัน
EXPOSE 5000

# คำสั่งเพื่อรันแอป
CMD ["npm", "start"]
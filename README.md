<h1 align="center">Medicine Dose Tracker</h1>

<h2 align="left">Medicine Dose Tracker Front-End</h2>

- Cấu hình frontend:
   - clone backend như sau:
   ```
   git init
   git remote add origin https://github.com/dinhle2701/Medicine-Tracker.git
   git branch -M frontend
   git pull https://github.com/dinhle2701/Medicine-Tracker.git frontend
- Khởi động dự án:
   - Sau khi clone dự án về sẽ thấy cấu trúc như sau: 
![image](https://github.com/user-attachments/assets/72635cd3-e910-41c3-b26a-b5c65bb8928d)

   - Nhấp phải chuột vào thư mục `frontend` -> chọn `Open with Code`
![image](https://github.com/user-attachments/assets/1cc5998d-5626-410b-936f-090ab28ac8e1)
   - Tiếp theo mở Terminal:
   ```
   npm install
   npm start
   ``` 

   - `Link deploy`: https://d1wkia07jtyfq7.cloudfront.net/
   - `Link local`: http://localhost:3000


<h2 align="left">Medicine Dose Tracker Back-End</h2>

<h3>Config Project</h3>

- Cấu hình database:
   - Tạo mới cơ sở dữ liệu cho việc chạy dự án
    ``` 
    create database MedicineTracker;
    use MedicineTracker; 
    ```
- Cấu hình backend:
   - clone backend như sau:
   ```
   git init
   git remote add origin https://github.com/dinhle2701/Medicine-Tracker.git
   git branch -M backend
   git pull https://github.com/dinhle2701/Medicine-Tracker.git backend
- Khởi động dự án: 
   - `Link local`: http://localhost:8888
   - `Link api local`:
     - medicine: http://localhost:8888/api/v1/medicines
     - auth: http://localhost:8888/api/v1/auth
     - noti: http://localhost:8888/api/v1/noti 
   - `Link deploy`: 
      - medicines: "https://h8lafaqr65.execute-api.us-east-1.amazonaws.com/prod/api/v1/medicines",
      - auth: "https://h8lafaqr65.execute-api.us-east-1.amazonaws.com/prod/api/v1/auth",
      - noti: "https://h8lafaqr65.execute-api.us-east-1.amazonaws.com/prod/api/v1/noti"
   - Sau khi clone dự án về sẽ thấy cấu trúc như sau: 
![image](https://github.com/user-attachments/assets/72635cd3-e910-41c3-b26a-b5c65bb8928d)
   - Nhấp phải chuột vào thư mục `backend` -> chọn `Open Folder as Intellij IDEA Project` 
![image](https://github.com/user-attachments/assets/01e5c9e1-0a03-4be2-83b1-e84320b98c01)
   - Khởi tạo dự án, nhấn chọn nút `Run MedicineTrackerApplication`:
![image](https://github.com/user-attachments/assets/b54afaad-1b13-4340-a704-3dbe03823fe6)

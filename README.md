# 餐廳清單

<br>

此專案可以讓使用者瀏覽、搜尋特定的餐廳，並且可以點擊餐廳圖示瀏覽更詳細的餐廳資訊。
此外，也可以新增、刪除和修改餐廳資料。

必須登入後才能使用，支援 Facebook 登入功能。

<br>

## 專案功能

1. 使用者可以新增一家餐廳
2. 使用者可以瀏覽一家餐廳的詳細資訊
3. 使用者可以瀏覽全部所有餐廳
4. 使用者可以依據餐廳名稱與類別搜尋特定餐廳
5. 使用者可以修改一家餐廳的資訊
6. 使用者可以刪除一家餐廳
7. 使用者可以選擇特定方式來排序餐廳顯示順序
8. 使用者可以註冊帳號
9. 使用者可以透過 FB 或註冊帳號登入

## 畫面瀏覽
![alphacamp 2-3 A8 作業](https://user-images.githubusercontent.com/78346513/124761617-8f5ea400-df64-11eb-85b1-3b9be575c605.png)

![alphcamp 3 A1](https://user-images.githubusercontent.com/78346513/127887020-fe92d751-e3c2-415a-88f4-8b17580433db.png)

## 建置環境

<br>

* node.js : ^10.15.0
* express: ^4.17.1
* express-handlebars: ^5.3.2
* mongoose: ^5.12.0
* mongoDB: ^4.2.14

<br>

## 安裝流程

<br>

1. 藉由 git clone 將專案下載至本地
```
git clone https://github.com/WilliamTsou818/restaurant-list.git
```
2. 進入專案資料夾
```
cd restaurant-list
```
3. 安裝套件
```
npm install
```
4. 加入種子資料
```
npm run seed
```
5. 啟動網頁伺服器
```
npm run dev
```
6. 出現下列訊息，表示啟動成功，可點選連結開啟網頁

The server is running on http://localhost:3000

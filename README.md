#JS地下城 1F 九九乘法表
## 練習目標:
**Javascript:**
1. JS的命名與CSS分開
**Sass:**
1. 使用@import分割檔案
2.使用自己的格線系統
3.類別階層不超過四層為原則
4.不使用 ID，一律使用
5. Smacss — 模組化核心語法
6. 一率採用小駝峰式命名


![Image](https://miro.medium.com/max/527/1*UKh02viS_-Roi-yL-ARpzw.png)

一陣子沒練習感覺就會忘記，一開始的排版居然就讓我想了一陣子…
四個角的x一開始我用flex，但距離總是抓不對，
翻了之前的HTML/CSS的筆記才想起還有before/after的屬性了。
要記得之後看到前後有插入東西的排版要想起before/after，
開始進入正題…
## Smacss — 模組化核心語法
使用BS4習慣後，對於每次都要為特定的HTML標籤命名寫屬性感到麻煩，
這時使用each+ Sass Maps就很方便。

```css
$map{
  key1: value1,//value後面是,結尾
  key2: value2,
  key3: value3,
}
```
### 1. 注意key的名稱不能重複。
### 2. key/value可以是各種Sass資料型態
  - 字串: 可以有上引號也可以沒有。“微軟正黑體”、nowrap。
  - 數值: 可以有單位也可以沒有單位。12、12px。
  - 顏色: 可以是顏色。#fffff、rgba(255,255,255)。
  - 數值列表: 列表中間可以是空白隔開，或是用逗號隔開。10px 20px 10px 20px、 Arial, sans-serif…..
  - 布林: true、false
  - 函式: meta.get-function()、call()
### 3. Map函式運用

map-get(map, key): 回傳指定的key的value。
```css
$font-sizes: (“small”: 12px, “normal”: 18px, “large”: 24px)
map-get($font-sizes, “small”)
Result: 12px
```
map-has-key(map, key): 檢查map裡面有沒有指定的key。確認有無後回傳true或false。
```css
$font-sizes: ("small": 12px, "normal": 18px, "large": 24px)
map-has-key($font-sizes, "big")
Result: false
```

map-keys(map): 回傳map裡面所有的key

```css
$font-sizes: ("small": 12px, "normal": 18px, "large": 24px)
map-keys($font-sizes)
Result: "small", "normal, "large"
```

map-merge(map1, map2): 合併map1和map2

```css
$font-sizes: ("small": 12px, "normal": 18px, "large": 24px)
$font-sizes2: ("x-large": 30px, "xx-large": 36px)
map-merge($font-sizes, $font-sizes2)
Result: "small": 12px, "normal": 18px, "large": 24px, "x-large": 30px, "xx-large": 36px
```

map-remove(map, keys..): 移除map中指定的key
```css
$font-sizes: ("small": 12px, "normal": 18px, "large": 24px)
map-remove($font-sizes, "small")
Result: ("normal": 18px, "large": 24px)
map-remove($font-sizes, "small", "large")
Result: ("normal": 18px)
```

map-values(map): 回傳map中所有value的值
```css
$font-sizes: ("small": 12px, "normal": 18px, "large": 24px)
map-values($font-sizes)
Result: 12px, 18px, 24px
```

### 4. 以下為例:
Sass Maps如其名，就像一張地圖，map中有key和value，透過each(指南針)去搜尋資料。
@each $name, $color in $type {….}
@each像是for迴圈一樣，一一去對照$type中的key。
$name,$color 則是對應 $type中的key和value，以逗號分界，逗號前的$name就是key，逗號後的$color就是value
in $type 就是指定在這個名為type的map中找資料。
#{$name} 因為變數無法直接接字串，如果希望變數可以連結字串的話，就得用#{變數}包起來。
=>透過each的方法，就能批次組合出class名稱，text-primary、bg-white….
```css
$type: (
//key: value
primary: #2eb738,
white: #ffffff,
);
@each $name,$color in $type{
  .text-#{$name}{
    color: $color;
  }
  .bg-#{$name}{
    background-color: $color;
  }
}
```

## 插入外部字體
這好像有點基本，但是我之前都沒使用過…(慚愧)
因為我使用的是Sass編輯我的CSS，因為資料夾位置不同，Sass有兩層資料夾，CSS只有一層，但是我在Sass編譯時，emmet也會很"貼心"的讓你../../從Sass資料夾回兩層去找font所在的資料夾，而編譯出的CSS也會../../找兩層的資料夾，但實際HTML讀取到的是CSS那個檔案阿，只有../一層。這邊要特別注意。

![Image](https://miro.medium.com/max/2648/1*Qc94zEdYUSUYESpQXdRXrQ.png)
```css
@font-face {
font-family: 'HelveticaNeue'; //定義插入字體的名字
src: url('../font/helveticaneue-webfont.woff2') format('woff2'),
// 
url('../font/HelveticaNeue.eot') format('opentype'),
//  舊版 IE (IE9 之下) 瀏覽器
url('../font/HelveticaNeue.ttf') format('truetype'), 
//  舊版 Android (4.4 版以下) 瀏覽器
url('../font/helveticaneue-webfont.woff') format('woff');
//  大多數瀏覽器(包含chrome)，但在許多較舊的瀏覽器中無法使用
font-weight: normal;
//確認是否是font-weight: normal的屬性，不是就不需要下載，並不是增加css屬性
}
```
[字型轉檔的網站](https://cloudconvert.com/)
透過 local () 指令，可以參照、載入及使用本機安裝的字型。
透過 url () 指令，可以載入外部字型，而且該指令可以包含一個可選的 format () 提示，指示由提供的網址所參照的字型格式。
[資料參考網站](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/webfont-optimization?hl=zh-tw)

## 九九乘法表排版

![Image](https://miro.medium.com/max/530/1*Us-K4TN7OqjkaOeSR2T5zA.png)

首先看上層，最大的2的高度和三個乘法算式是等高，因此去抓出右邊三個算式的文字高度33px加上margin的高度8px，總共是123px。
這裡的重點是將最大的2的line-height設定為123px，讓他和三個算式等高，這樣排版起來就可以整齊了。
## 使footer置底

![Image](https://miro.medium.com/max/2870/1*OuIng8CzPtaDsZn3nBo22w.png)

透過將footer補滿上一層的高度，讓footer置底。
```css
.content{
min-height: calc(100vh - 34px);//設定最小高度讓footer可以在高度不足的情況也可以置底
}
```
這邊透過設置min-height: content(100vh)減掉footer的高度(34px)，使footer置底。
注意部要寫成height了，不然整個畫面的高度就會被限制住，當內容增加時就部會自適應延伸了。
補充: 100vh 指的是螢幕可視範圍高度的百分比

## Javacript
JS部分主要是分兩個迴圈，
第一個迴圈加入外框和數字標題，
主要框架都建立完成後，第二個雙迴圈加入九九乘法的算式，避免把原本裡面的內容洗掉，不用innerHTML，改用createElement。
```javascript
let content = document.querySelector('.js-content');
//先將第一個標題存入str
let str =
`<div class="col-4 d-flex flex-col justify-content-center align-items-center mb-4">
<div class="title-upperLine"></div>
<span class="title-CH">九九乘法表</span>
<span class="title-ENG">MULTIPLICATION CHART</span>
<div class="title-underLine"></div>
</div>`;
//加入表格外框和數字標題
for( let i = 2 ; i < 10 ; i++){
let mulItem =
`<div class="col-4">
 <div class="bg-white l-block d-flex flex-col flex-wrap align-content-between js-numberTable">
  <span class="num-title">${i}</span>
 </div>
</div>`;
str += mulItem;
}
content.innerHTML = str;
//加入算式的部分
let numberTable = document.querySelectorAll('.js-numberTable');
for( let i = 2 ; i < 10 ; i++){
 for( let j = 1 ; j < 10 ; j ++){
  let addCount = document.createElement('p');
  addCount.textContent = `${i} x ${j} = ${i*j}` ;
  addCount.setAttribute('class','num-item');
  numberTable[i-2].appendChild(addCount);
 }
}
```

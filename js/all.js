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
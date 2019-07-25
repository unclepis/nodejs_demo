// 判断浏览器是否支持File Api
function isBrowserSupportFileApi() {
    const { File, FileReader, FileList, Blob } = window
    if (!(File && FileReader && FileList && Blob)) {
        throw new Error('当前浏览器对FileApi的支持不完善')
    }
}

// 监听文件变化
function AddFileListener() {
    const fileDom = document.querySelector('#files');
    fileDom.addEventListener('change', handleFileSelect, false)
}

// 文件选择后的回调函数
function handleFileSelect(event) {
    const { files } = event.target;
    if (!files.length) {
        console.log("没有选择文件");
        return;
    }
    inspectFileProcess(files);
    showImageList(files);
    console.log("选中的文件信息是：", files);
}

// onloadstart回调
const handleLoadStart = (ev, file) => {
    console.log(`>>> Start load ${file.name}`);
}
// onload回调
const handleOnload = (ev, file) => {
    console.log(`<<< End load ${file.name}`);

    const img = document.createElement("img");
    img.height = 250;
    img.width = 250;
    img.src = URL.createObjectURL(new Blob([ev.target.result]));
    dom.appendChild(img);
    // 完成加载后，将其放入dom元素中
    if (++loaded === total) {
        document.querySelector("#images").appendChild(dom);
    }
}

const handleProgress = (ev, file) => {
    if (!ev.lengthComputable) {
        return;
    }
    // 计算进度，并且以百分比形式展示
    const percent = Math.round((ev.loaded / ev.total) * 100);
    console.log(`<<< Loding ${file.name}, progress is ${percent}%`);
};

let dom = document.createDocumentFragment(),
    loaded = 0,
    reImage = /image.*/,
    total = 0;

// 检测文件上传的过程
function inspectFileProcess(files) {
    for (let file of files) {
        total++;
        if (!reImage.test(file.type)) {
            continue;
        }
        const reader = new FileReader();
        reader.onloadstart = ev => handleLoadStart(ev, file);
        reader.onload = ev => handleOnload(ev, file);
        reader.onprogress = ev => handleProgress(ev, file);
        // 读取文件对象
        // reader.readAsDataURL(file);
        // 读取buffer
        reader.readAsArrayBuffer(file);
    }


}

// 如果是图片的话显示图片列表
function showImageList(files) {
    const innerHTML = [];
    const reImage = /image.*/; // 图片类型出现列表

    for (let file of files) {
        if (!reImage.test(file.type)) {
            continue;
        }

        innerHTML.push(
            `
      <li>
        <strong>${file.name}</strong>
        (${file.type || "n/a"}) -
        ${file.size} bytes
      </li>
      `
        );
        document.querySelector("#list").innerHTML = `<ul>${innerHTML.join("")}</ul>`;
    }
}
isBrowserSupportFileApi();
AddFileListener();


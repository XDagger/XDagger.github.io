// 从网络上读取某个excel文件，url必须同域，否则报错
function readWorkbookFromRemoteFile(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function(e) {
        if(xhr.status == 200) {
            var data = new Uint8Array(xhr.response);
            var workbook = XLSX.read(data, {type: 'array'});
            if(callback) callback(workbook);
        }
    };
    xhr.send();
}

function readWorkbook(workbook) {
    var sheetNames = workbook.SheetNames;
    var worksheet = workbook.Sheets[sheetNames[0]];
    var csv = XLSX.utils.sheet_to_csv(worksheet);
    let arr = csv.split("\n")
    let brr = arr.slice(0,101)
    console.log(brr)
    let htmltxt = [];
    brr.map((item,index)=> {
        if(index){
            let str = item.split(',');
            $("#rankbody").append(
                `  <tr>
                        <td>
                        <div class="ques-card-list${index} li">
                            <div class="ques-list-box">
                            <div class="ques-list-head">
                            <div class="ques-list-image">
                            ${index}
                            </div>
                            </div>
        
                            </div>
                            </div>
                            </td>
                            <td width="100%">${str[1]}</td>
                        <td>${str[2]}</td>
                </tr>`
            )
        }

    });

}

$(function() {
    loadRemoteFile('../assets/xlsx/xdag_address.xlsx');
});

function loadRemoteFile(url) {
    readWorkbookFromRemoteFile(url, function(workbook) {
        readWorkbook(workbook);
    });
}

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
    let brr = arr.slice(0,201)
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
                        <td>${toThousands(str[2])}</td>
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
function toThousands(str) {
    var newStr = "";
    var count = 0;
    // 当数字是整数
    if (str.indexOf(".") == -1) {
        for (var i = str.length - 1; i >= 0; i--) {
            if (count % 3 == 0 && count != 0) {
                newStr = str.charAt(i) + "," + newStr;
            } else {
                newStr = str.charAt(i) + newStr;
            }
            count++;
        }
        str = newStr ; //自动补小数点后两位
        return str;
    }
    // 当数字带有小数
    else {
        for (var i = str.indexOf(".") - 1; i >= 0; i--) {
            if (count % 3 == 0 && count != 0) {
                newStr = str.charAt(i) + "," + newStr;
            } else {
                newStr = str.charAt(i) + newStr; //逐个字符相接起来
            }
            count++;
        }
        str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
        return str;
    }
    // return result.join('');
}

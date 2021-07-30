function copyAddress(url) {
    navigator.clipboard.writeText(url);
}
function copyLft(obj) {
    let str = $(obj).data("address");
    copyAddress(str)
}
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
    $(document).on('shown.bs.tooltip', function (e) {
        setTimeout(function () {
            $('[data-toggle="tooltip"]').tooltip('hide');
        }, 1000);
    });
});

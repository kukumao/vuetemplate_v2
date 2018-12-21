(() => {
  let ipt = document.createElement('input');
  ipt.type = 'text';
  ipt.id = 'clipBoard';
  ipt.style.position = 'relative';
  ipt.style.top = '-9999999999px';
  document.body.appendChild(ipt);
})();

let clipBoard = {
  /**
  * 复制功能
 * @param  {[type]} that     [this]
 * @param  {[type]} value    [复制内容]
 * @param  {[type]} msg      [复制成功后的提示信息]
 */
  copy(that, value, msg) {
    let sucMsg = msg || '复制成功';
    let ipt = document.getElementById('clipBoard');
    ipt.value = value;
    ipt.select();
    if (document.execCommand('Copy')) {
      that.$message({
        showClose: true,
        message: sucMsg,
        type: 'success',
        duration: 3000
      });
    } else {
      that.$message({
        showClose: true,
        message: '复制失败',
        type: 'success',
        duration: 3000
      });
    }

  }
};
export default clipBoard;

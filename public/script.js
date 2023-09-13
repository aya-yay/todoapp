$(function () {
    var $carousel = $('.mypattern');

    // slickの初期化
    $carousel.slick({
        // dots: true,
        // autoplay: true,
        // autoplaySpeed: 3000,
        // centerMode: true,
        // centerPadding: '10%',
        // slidesToShow: 1,

        autoplay: true,
        // autoplaySpeed: 2000,
        autoplaySpeed: 2000,
        speed: 2500,
        dots: true,
        arrows: true,
        // centerMode: true,
        // centerPadding: '20%',
        pauseOnHover: true,
        slidesToShow: 3,
        slidesToScroll: 2,
        cssEase: 'ease'//開始から終了まで一定に変化する


    });

    // スクロールイベントの監視
    $carousel.on('wheel', function (e) {
        e.preventDefault();

        if (!$carousel.hasClass('js-slick-moving')) {
            if (e.originalEvent.deltaY < 0) {
                $(this).slick('slickNext');
            } else {
                $(this).slick('slickPrev');
            }
        }
    })

    // スライド送り中を判定するためにクラスを付与する
    $carousel.on('beforeChange', function () {
        $carousel.addClass('js-slick-moving');
    });

    $carousel.on('afterChange', function () {
        $carousel.removeClass('js-slick-moving');
    });
});

// ----------------------------------------------------------------------

//me.indexのアコーディオン
// .s_04 .accordion_one
$(function () {
    //.accordion_oneの中の.accordion_headerがクリックされたら
    $('.s_04 .accordion_one .accordion_header').click(function () {
        //クリックされた.accordion_oneの中の.accordion_headerに隣接する.accordion_innerが開いたり閉じたりする。
        $(this).next('.accordion_inner').slideToggle();
        $(this).toggleClass("open");
        //クリックされた.accordion_oneの中の.accordion_header以外の.accordion_oneの中の.accordion_headerに隣接する.accordion_oneの中の.accordion_innerを閉じる
        $('.s_04 .accordion_one .accordion_header').not($(this)).next('.accordion_one .accordion_inner').slideUp();
        $('.s_04 .accordion_one .accordion_header').not($(this)).removeClass("open");
        $('.s_04 .accordion_one .accordion_header.stay').not($(this)).toggleClass("open");
    });
});

// ----------------------------------------------------------------------
// index.htmlタブ機能

$(function () {

    /*
     * Tabs
     */
    $('#work').each(function () {

        // タブの各要素を jQuery オブジェクト化
        var $tabList = $(this).find('.tabs-nav, home-logo'),   // タブのリスト
            $tabAnchors = $tabList.find('a'),          // タブ (リンク)
            $tabPanels = $(this).find('.tabs-panel'); // パネル

        // タブがクリックされたときの処理
        // 引数としてイベントオブジェクトを受け取る
        $tabList.on('click', 'a', function (event) {

            // リンクのクリックに対するデフォルトの動作をキャンセル
            event.preventDefault();

            // クリックされたタブを jQuery オブジェクト化
            var $this = $(this);

            // もしすでに選択されたタブならなにもせず処理を中止
            if ($this.hasClass('active')) {
                return;
            }

            // すべてのタブの選択状態をいったん解除し、
            // クリックされたタブを選択状態に
            $tabAnchors.removeClass('active');
            $this.addClass('active');

            // すべてのパネルをいったん非表示にし、
            // クリックされたタブに対応するパネルを表示
            $tabPanels.hide();
            $($this.attr('href')).show();

        });

        // 最初のタブを選択状態に
        $tabAnchors.eq(0).trigger('click');

    });

});

//iframe内のhtmlを変更する(home)
function changeIFrame(jumpURL) {
    myFrame.location.href = jumpURL;
}

//iframe内のhtmlを変更する(works)
function changeIFrame2(jumpURL2) {
    myFrame2.location.href = jumpURL2;
}

//スクロールを促すマーク
jQuery(function () {
    var scrolldown = $('.scrolldown4');
    scrolldown.hide();
    $(window).scroll(function () {
        if ($(this).scrollTop() > 1) {  //pxスクロールしたら表示
            scrolldown.fadeIn();
        } else {
            scrolldown.fadeOut();
        }
    });
});


//時計-------------------------------------------
(() => {
    class ClockDrawer {
        constructor(canvas) {
            this.ctx = canvas.getContext('2d');
            this.width = canvas.width;
            this.height = canvas.height;
        }
        draw(angle, func) {
            this.ctx.save();

            this.ctx.translate(this.width / 2, this.height / 2);
            this.ctx.rotate(2 * Math.PI / 360 * angle);
            this.ctx.beginPath();
            func(this.ctx);
            this.ctx.stroke();
            this.ctx.restore();
        }
        clear() {
            this.ctx.clearRect(0, 0, this.width, this.height);
        }
    }
    class Clock {
        constructor(drawer) {
            this.r = 60;
            this.drawer = drawer;
        }
        drawFace() {
            for (let angle = 0; angle < 360; angle += 6) {
                this.drawer.draw(angle, ctx => {
                    ctx.moveTo(0, -this.r);
                    if (angle % 30 === 0) {
                        ctx.lineWidth = 3;
                        ctx.lineTo(0, -this.r + 10);
                        ctx.font = '13px Arial';
                        ctx.textAlign = 'center';
                        ctx.strokeStyle = 'white';
                        ctx.fillStyle = 'white';
                        ctx.fillText(angle / 30 || 12, 0, -this.r + 23);
                    } else {
                        ctx.lineTo(0, -this.r + 5);
                        ctx.strokeStyle = 'white';
                    }
                });
            }
        }
        drawHands() {
            //hour
            this.drawer.draw(this.h * 30 + this.m * 0.5, ctx => {
                ctx.strokeStyle = 'white';
                ctx.lineWidth = 4;
                ctx.moveTo(0, 3);
                ctx.lineTo(0, -this.r + 35);
            });

            //minute
            this.drawer.draw(this.m * 6, ctx => {
                ctx.strokeStyle = 'white';
                ctx.lineWidth = 2;
                ctx.moveTo(0, 3);
                ctx.lineTo(0, -this.r + 25);
            });

            //second
            this.drawer.draw(this.s * 6, ctx => {
                ctx.strokeStyle = 'red';
                ctx.moveTo(0, 6);
                ctx.lineTo(0, -this.r + 20);
            });
        }
        update() {
            const d = new Date();
            this.h = d.getHours();
            this.m = d.getMinutes();
            this.s = d.getSeconds();
        }
        run() {
            this.update();
            this.drawer.clear();
            this.drawFace();
            this.drawHands();

            setTimeout(() => {
                this.run();
            }, 100);
        }
    }
    const canvas = document.querySelector('canvas');
    if (typeof canvas.getContext === 'undefined') {
        return;
    }
    const clock = new Clock(new ClockDrawer(canvas));
    clock.run();
})();
//-------------------------------------------

//Todo-------------------------------------------------

// window.addEventListener('DOMContentLoaded', ()=>{
//     const save=()=>localStorage.setItem('todos',todos.innerHTML);
//     todos.innerHTML=localStorage.getItem('todos');
//     document.addEventListener('click',({target})=>{
//       if(target.matches('#add')){
//         event.preventDefault();
//         const li = tmp_li.content.cloneNode(true).querySelector('li');
//         li.querySelector('span').textContent=txt.value;
//         todos.prepend(li);
//         txt.value='';
//         save();
//       }
//       if(target.matches('.del') && confirm('選択したタスクを削除する？')){
//         target.closest('li').remove();
//         save();
//       }
//       if(target.matches('#checkAll')){
//         document.querySelectorAll('.chk').forEach(x => x.checked=true);
//       }
//       if(target.matches('#purge') && confirm('選択したリストを削除する？')){
//         document.querySelectorAll('.chk:checked').forEach(x => x.closest('li').remove());
//         save();
//       }
//     });
//   });

//カレンダー----------------------------------


// console.clear();
// {
//     const today = new Date();
//     let year = today.getFullYear();
//     let month = today.getMonth();
//     function getCalendarHead() {
//         const dates = [];
//         const d = new Date(year, month, 0).getDate();
//         const n = new Date(year, month, 1).getDay();
//         for (let i = 0; i < n; i++) {
//             dates.unshift({
//                 date: d - i,
//                 isToday: false,
//                 isDisabled: true,
//             });
//         }
//         return dates;
//     }
//     function getCalendarBody() {
//         const dates = []; 
        //日付
    //     const lastDate = new Date(year, month + 1, 0).getDate();

    //     for (let i = 1; i <= lastDate; i++) {
    //         dates.push({
    //             date: i,
    //             isToday: false,
    //             isDisabled: false,
    //         });
    //     }
    //     if (year === today.getFullYear() && month === today.getMonth()) {
    //         dates[today.getDate() - 1].isToday = true;
    //     }
    //     return dates;
    // }
    // function getCalendarTail() {
    //     const dates = [];
    //     const lastDay = new Date(year, month + 1, 0).getDay();
    //     for (let i = 1; i < 7 - lastDay; i++) {
    //         dates.push({
    //             date: i,
    //             isToday: false,
    //             isDisabled: true,
    //         });
    //     }
    //     return dates;
    // }
    // function clearCalendar() {
    //     const tbody = document.querySelector('tbody');

    //     while (tbody.firstChild) {
    //         tbody.removeChild(tbody.firstChild);
    //     }
    // }
    // function renderTitle() {
    //     const title = `${year}/${String(month + 1).padStart(2, 0)}`;
        //2桁で埋める＆満たなければ0で埋める
    //     document.getElementById('title').textContent = title;
    // }
    // function renderWeeks() {
    //     const dates = [
    //         ...getCalendarHead(),
    //         ...getCalendarBody(),
    //         ...getCalendarTail(),
    //     ];
    //     const weeks = [];
    //     const weeksCount = dates.length / 7;
    //     for (let i = 0; i < weeksCount; i++) {
    //         weeks.push(dates.splice(0, 7)); 
            //先頭から７日分削除しながら取り出す
    //     }
    //     weeks.forEach(week => {
    //         const tr = document.createElement('tr');
    //         week.forEach(date => {
    //             const td = document.createElement('td');

    //             td.textContent = date.date;
    //             if (date.isToday) {
    //                 td.classList.add('today');
    //             }
    //             if (date.isDisabled) {
    //                 td.classList.add('disabled');
    //             }
    //             tr.appendChild(td);
    //         });
    //         document.querySelector('tbody').appendChild(tr);
    //     });
    // }
    // function createCalendar() {
    //     clearCalendar();
    //     renderTitle();
    //     renderWeeks();
    // }
    // document.getElementById('prev').addEventListener('click', () => {
    //     month--;
    //     if (month < 0) {
    //         year--; 
            //1引いて12月に戻す
//             month = 11;
//         }
//         createCalendar();
//     });
//     document.getElementById('next').addEventListener('click', () => {
//         month++;
//         if (month > 11) {
//             year++;
//             month = 0;
//         }

//         createCalendar();
//     });
//     document.getElementById('today').addEventListener('click', () => {
//         year = today.getFullYear();
//         month = today.getMonth();

//         createCalendar();
//     });
//     createCalendar();
// }
//----------------------------------------------------------

// ToDoApp--------------------------------------------------

const tasksDOM = document.querySelector(".tasks");
const formDOM = document.querySelector(".task-form");
const taskInputDOM = document.querySelector(".task-input");
const formAlertDOM = document.querySelector(".form-alert");


// /api/v1/tasksからタスクを読み込む

const showTasks = async () => {
    try {
        //自作のapiを叩く
        const { data: tasks } = await axios.get("/api/v1/tasks"); //dataという属性をtasksという形で取得
        //タスクが１つもないとき
        console.log(tasks.length);
        if(tasks.length < 1) {
            tasksDOM.innerHTML = `<h5 class="empty-list">まだタスクはありません</h5>`;
            return;
        }
        //タスクを出力
        const allTasks = tasks.map((task) => {
            const { completed, _id, name } = task; //1つ1つ取り出す新しい取り出し方

            return ` 
            <div class="single-task ${completed && "task-completed"}">
                <h5>
                    <span><i class="far fa-check-circle"></i></span>
                    ${name} 
                </h5>
                <div class="task-links">
                    <!-- 編集リンク -->
                    <a href="edit.html?id=${_id}" class="edit-link">
                        <i class="fas fa-edit"></i>
                    </a>
                    <!-- ゴミ箱リンク -->
                    <button type="button" class="delete-btn" data-id="${_id}">
                        <i class="fas fa-trash "></i>
                    </button>
                </div>
            </div>
            `;
        }).join("");
            //${completed && "task-completed"}→チェックがついていたらtask-completedクラスを付与する（丸いチェックマークがvisibleになる）        
            //※{name}は上で1つ1つ取り出したうちのname
            //配列のカンマを取り除くことができるjoin関数
        tasksDOM.innerHTML = allTasks;


    } catch (err) {
        console.log(err);
    }
};

showTasks();

//タスクを新規作成する

formDOM.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = taskInputDOM.value;

    try {
        await axios.post("/api/v1/tasks", { name: name });
        //左のname:はTask.jsのname:、右のnameは56行目の定数name(inputフォームに入力されたnameの値つまり入力されたタスク)
        showTasks();//投稿されたデータを表示する
        taskInputDOM.value = "";//submit押下後、フォームを空にする
        formAlertDOM.style.display = "block";//73行目でnoneになっているので追加しましたが出現するようにする
        formAlertDOM.textContent = "タスクを追加しました";
        formAlertDOM.classList.add("text-success");//新しいクラスをつけてcssで装飾
    } catch (err) {
        console.log(err);
        formAlertDOM.style.display = "block";//73行目でnoneになったのでエラー文を表示させる
        formAlertDOM.innerHTML = "タスクは200文字以内で入力してください";//200文字を超えた場合
        setTimeout(() => {
            formAlertDOM.style.display = "none";//（3秒後に）エラー文が消える
            formAlertDOM.classList.remove("text-success");//67行目のtext-successの色が反映されているので削除
        }, 3000);//3秒後にエラー文が消える
        ;
    }
});


//タスクを削除する

tasksDOM.addEventListener("click", async (event) => {
    const element = event.target; //clickすると要素を取得
    console.log(element.parentElement); //親要素(buttonタグ)も取得
    if (element.parentElement.classList.contains("delete-btn")) {
        const id = element.parentElement.dataset.id;
        console.log(id);
        try {
            await axios.delete(`/api/v1/tasks/${id}`);
            showTasks();
        } catch (err) {
            console.log(err);
        }
    }
});

//コンタクトフォーム
const contactForm = document.querySelector('.contact-form');
let name = document.getElementById('name');
let email = document.getElementById('email');
let message = document.getElementById('message');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
  
    let formData = {
      name: name.value,
      email: email.value,
      message: message.value
    }

   let xhr = new XMLHttpRequest();
   xhr.open('POST', '/');
   xhr.setRequestHeader('content-type', 'application/json');
   xhr.onload = function() {
    console.log(xhr.responseText);
    if(xhr.responseText === "成功しました") {
      alert('メッセージありがとうございました！');
      name.value = '';
      email.value = '';
      message.value = '';
    } else {
      alert('something went wrong')
    }
   }
   xhr.send(JSON.stringify(formData));
  })
var courses = [
    //'下一代Internet技术与协议',
    //'体育专项(下)[男]',
    //'3D打印创新实践（双创）',
];
//抢课时间间隔，单位为ms
var interval = 300;
//禁止改动
var targets = [];

var running;

function getCourses() {
    //必修
    $.post(
        '/jsxsd/xsxkkc/xsxkBxxk',
        {
            sEcho: 1,
            iColumns: 11,
            iDisplayStart: 0,
            iDisplayLength: 99999,
        },
        processData
    );
    //选修
    $.post(
        '/jsxsd/xsxkkc/xsxkXxxk',
        {
            sEcho: 1,
            iColumns: 11,
            iDisplayStart: 0,
            iDisplayLength: 99999,
        },
        processData
    );
    //公选
    $.post(
        '/jsxsd/xsxkkc/xsxkGgxxkxk',
        {
            sEcho: 1,
            iColumns: 11,
            iDisplayStart: 0,
            iDisplayLength: 99999,
        },
        processData
    );
}

function processData(resp) {
    let data = $.parseJSON(resp).aaData;
        for (let course of data)
            if (courses.indexOf(course.kcmc) != -1)
                targets.push([course.kch, course.jx0404id]);
}

function takeCourses(targets) {
    if(!targets.length)
	getCourses();
    for (let target of targets)
        $.ajax({
            url: "/jsxsd/xsxkkc/xxxkOper",
            data: { kcid: target[0], jx0404id: target[1] }
        });

    console.log('running......');
}

function start() {
    running = window.setInterval(takeCourses, interval, targets);
    console.log('start');
}

function stop() {
    window.clearInterval(running);
    console.log('stop');
}

start();

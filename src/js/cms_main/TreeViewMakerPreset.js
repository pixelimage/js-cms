//プリセットデータ

var TreeViewMakerPreset = (function(){
	
	var data = {}
	
	/* ---------- ---------- ---------- */

	var o = {}
		o.targetDir = "--";
		o.targetTag = "--";
		o.levels = [
 { isShow: true, isOpen: true, dir: '<p>{NAME}</p>', page: '<a href="{HREF}" target="{TAR}">{NAME}</a> ' },
 { isShow: true, isOpen: true, dir: '<p>{NAME}</p>', page: '<a href="{HREF}" target="{TAR}">{NAME}</a> ' },
 { isShow: true, isOpen: true, dir: '<p>{NAME}</p>', page: '<a href="{HREF}" target="{TAR}">{NAME}</a> ' },
 { isShow: true, isOpen: true, dir: '<p>{NAME}</p>', page: '<a href="{HREF}" target="{TAR}">{NAME}</a> ' },
 { isShow: true, isOpen: true, dir: '<p>{NAME}</p>', page: '<a href="{HREF}" target="{TAR}">{NAME}</a> ' }
 		];
		o.setting = {
			hasDate: false,
			isFlat: false,
			isReverse: false,
			limitSub: "",
			indent: "3",
			onlyCurrent: false,
			useToggle: false
		}
		o.css = {
			hasSub: true,
			underconst: true,
			clearfix: false,
			current: true,
			hasSub: true,
			level: true,
			no: false,
			ownCurrent: true,
			sum: false,
			type: true,
			underconst: true
		}
	data.simple = o;
	
	/* ---------- ---------- ---------- */

	var o = {}
		o.targetDir = "--";
		o.targetTag = "--";
		o.levels = [
			//第1階層
			{
				isShow: true,
				isOpen: true,
				dir: '<a href="{HREF}" target="{TAR}" class="{CSS.B}"><span class="t1">{NAME[0]}</span><span class="t2">{NAME[1]}</span></a>',
				add: '<a href="{HREF}" target="{TAR}" class="{CSS.B}"><span class="t1">{NAME[0]}</span><span class="t2">{NAME[1]}</span></a>'
			}
		]
		o.setting = {
			hasDate: false,
			isFlat: false,
			isReverse: false,
			limitSub: "",
			indent: "3",
			onlyCurrent: false,
			useToggle: false
		}
	data.gnavi = o;
	
	
	/* ---------- ---------- ---------- */

	var o = {}
		o.targetDir = "--";
		o.targetTag = "--";
		o.levels = [
			//第1階層
			{
				isShow: true,
				isOpen: true,
				add: '<a href="{HREF}" target="{TAR}" class="{CSS.B}"><span class="t1">{NAME[0]}</span><span class="t2">{NAME[1]}</span></a>'
			}
		]
		o.setting = {
			hasDate: false,
			isFlat: false,
			isReverse: false,
			limitSub: "",
			indent: "3",
			onlyCurrent: false,
			useToggle: false,
			add : {
				list: {
					texts: {},
					grid: [
						{ publicData: "1", text: "メニュー1", anchor: { href: "index.html", target: "" } },
						{ publicData: "1", text: "メニュー2", anchor: { href: "index.html", target: "" } },
						{ publicData: "1", text: "メニュー3", anchor: { href: "index.html", target: "" } },
						{ publicData: "1", text: "メニュー4", anchor: { href: "index.html", target: "" } }
					]
				},
				list2: {
					texts: {},
					grid: []
				}
			}
		}
	data.gnavi_c = o;
	
	/* ---------- ---------- ---------- */

	var o = {}
		o.targetDir = "--";
		o.targetTag = "--";
		o.levels = [
			//第1階層
			{
				isShow: true,
				isOpen: true,
				dir : '<p class="title"><span class="t1">{NAME[0]}</span><span class="t2">{NAME[1]}</span></p>',
				page: '<a href="{HREF}" target="{TAR}" class="{CSS.B}">{I.P}{NAME}{I.B}</a>',
				html: '{HTML}'
			},
			//第2階層
			{
				isShow: true,
				isOpen: true,
				dir : '<a href="{HREF}" target="{TAR}" class="{CSS.B}">{I.D}{NAME}</a>',
				page: '<a href="{HREF}" target="{TAR}" class="{CSS.B}">{I.P}{NAME}{I.B}</a>',
				html: '{HTML}'
			},
			//第3階層
			{
				isShow: true,
				isOpen: false,
				dir : '<a href="{HREF}" target="{TAR}" class="{CSS.B}">{I.D}{NAME}</a>',
				page: '<a href="{HREF}" target="{TAR}" class="{CSS.B}">{I.P}{NAME}{I.B}</a>',
				html: '{HTML}'
			},
			//第4階層
			{
				isShow: true,
				isOpen: false,
				dir : '<a href="{HREF}" target="{TAR}" class="{CSS.B}">{I.D}{NAME}</a>',
				page: '<a href="{HREF}" target="{TAR}" class="{CSS.B}">{I.P}{NAME}{I.B}</a>',
				html: '{HTML}'
			}
		]
		o.setting = {
			hasDate: false,
			isFlat: false,
			isReverse: false,
			limitSub: "",
			indent: "3",
			onlyCurrent: true,
			useToggle: false
		}
	data.snavi = o;
	
	/* ---------- ---------- ---------- */
	
	var o = {}
		o.targetDir = "--";
		o.targetTag = "--";
		o.levels = [
			//第1階層
			{
				isShow: true,
				isOpen: true,
				dir: '<a href="{HREF}" target="{TAR}">{NAME[0]}</a>'
			}, 
			//第2階層
			{
				isShow: true,
				isOpen: true,
				dir: '<a href="{HREF}" target="{TAR}">{I.D}{NAME}</a>',
				page: '<a href="{HREF}" target="{TAR}">{I.P}{NAME}</a>'
			}
		]
		o.setting = {
			hasDate: false,
			isFlat: false,
			isReverse: false,
			limitSub: "",
			indent: "3",
			onlyCurrent: false,
			useToggle: false
		}
	data.footer = o;
	
	
	/* ---------- ---------- ---------- */
	
	var o = {}
		o.targetDir = "--";
		o.targetTag = "--";
		o.levels = [
			//第1階層
			{
				isShow: true,
				isOpen: false,
				dir: '<a href="{HREF}" target="{TAR}">{I.D} {NAME}</a>',
				page: '<a href="{HREF}" target="{TAR}">{NAME}</a>',
				add: '<a href="{HREF}" target="{TAR}">{NAME}</a>'
			}, 
			//第2階層
			{
				isShow: true,
				isOpen: false,
				dir: '<a href="{HREF}" target="{TAR}">{I.D} {NAME}</a>',
				page: '<a href="{HREF}" target="{TAR}">{NAME}</a>'
			},
			//第3階層
			{
				isShow: true,
				isOpen: false,
				dir: '<a href="{HREF}" target="{TAR}">{I.D} {NAME}</a>',
				page: '<a href="{HREF}" target="{TAR}">{NAME}</a>'
			},
			//第4階層
			{
				isShow: true,
				isOpen: false,
				dir: '<a href="{HREF}" target="{TAR}">{I.D} {NAME}</a>',
				page: '<a href="{HREF}" target="{TAR}">{NAME}</a>'
			},
			//第5階層
			{
				isShow: true,
				isOpen: false,
				dir: '<a href="{HREF}" target="{TAR}">{I.D} {NAME}</a>',
				page: '<a href="{HREF}" target="{TAR}">{NAME}</a>'
			}
		]
		o.setting = {
			hasDate: false,
			isFlat: false,
			isReverse: false,
			limitSub: "",
			indent: "3",
			onlyCurrent: false,
			useToggle: true,
			add: {
				list: {
					texts: {},
					grid: []
				},
				list2: {
					texts: {},
					grid: [
						{ publicData: "1", text: "Facebook", anchor: { href: "#", target: "" } },
						{ publicData: "1", text: "Twitter", anchor: { href: "#", target: "" } }
					]
				}
			}
		}
		o.css = {
			hasSub: true,
			underconst: true,
			clearfix: false,
			current: true,
			hasSub: true,
			level: true,
			no: false,
			ownCurrent: true,
			sum: false,
			type: true
		}
		
	data.mobile = o;
	
	/* ---------- ---------- ---------- */
	
	
	
	
	return data;
	
})();



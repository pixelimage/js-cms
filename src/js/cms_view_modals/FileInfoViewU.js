
//新規作成時のデフォルトパラメータを提供する
if(!window._cms) window._cms = {}
window._cms.lastAddID = ""
var FileInfoView_U = (function(){
	
	function getParam(_t,_extra) {
		
		if(_t == "dir_new"){
			var id = DateUtil.getFormattedDate(new Date(),"YYYYMMDD_RRRRR");
			window._cms.lastAddID = id;
			return {
				id:id,
				name: "グループ,groupname",
				list:[],
				type: Dic.ListType.DIR,
				custom_a:"",
				extra:[]
			}
		}
		if(_t == "file_new"){
			var o = {
				dir : "",
				baseID : "page",
				baseName : "ページ"
			}
			o = _getDefPageInfo(_extra.uid,o);
			var id = "_" + DateUtil.getFormattedDate(new Date(),"YYYYMMDD_RRR");
			// window._cms.lastAddID = o.baseID + id;
			return {
				id:o.baseID + id,
				name: o.baseName + id,
				dir: o.dir,
				type: Dic.ListType.PAGE,
				custom_a:"",
				saveDate:"-",
				publicDate:"-",
				extra:[]
			}
		}
		if(_t == "html_new"){
			return {
				id:DateUtil.getFormattedDate(new Date(),"YYYYMMDD_RRRRR"),
				name: "見出し",
				type: Dic.ListType.HTML,
				html:"<b>見出し</b>",
				extra:[]
			}
		}
	}
	
	//所属グループの先頭のファイルの情報を返す
	function _getDefPageInfo(_uid,_param){
		if(_uid) {
			var _gloup = CMS_Data.Sitemap.getGloup_by_uid(_uid);
			if(_gloup){
				if(_gloup.list){
					if(_gloup.list.length > 0){
						var ls = _gloup.list;
						for (var i = 0; i < ls.length ; i++) {
							if(ls[i].type == Dic.ListType.PAGE){
								return _getDefPage_core(ls[i],_gloup,_param);
							}
						}
					} else{
						return _getDefPage_core(null,_gloup,_param);
					}
				}
			}
		}
		return _param;
	}
	function _getDefPage_core(_fi,_gloup,_param){
		if(_fi){
			_param.dir = (function(_n){ 
				if(!_n)return "";
				return _n;
			})(_fi.dir);
		}
		_param.baseID = (function(_n){ 
			if(!_n) return "page";
			if(_n == "sitemap_root") return "page";
			return _n;
		})(_gloup.id);
		_param.baseName = (function(_n){ 
			if(!_n) return "ページ";
			_n = _n.split(",").join("");
			_n = _n.split("/").join("");
			_n = _n.split("-").join("");
		    return _n.substr(0,5);
		})(_gloup.name);
		
		return _param;
	}

	
	return { getParam:getParam }
})();

var FileInfoGrid = (function() {
	/* ---------- ---------- ---------- */
	var c = function(_view) {
	  this.init(_view);
	}
	var p = c.prototype;
	/* ---------- ---------- ---------- */
	
	p.view;
	p.v;
	
	p.init = function(_view) {
		this.view = _view
	}
	p.initData = function (_array){
		var tag = '<div class="_replaceAreaGrid"></div>';
		this.view.append(tag)
		this.v = {}
		this.v.replaceAreaGrid = this.view.find("._replaceAreaGrid")
		var gridType = new PageModel.Object_Grid({
			isNarrow:true,
			gridType:Dic.GridType.BASE,
			gridInfo:new PageModel.OG_info({}),
			textData:null,
			gridData:{
				info: new PageModel.OG_SubInfo({}),
				cells:[
					new PageModel.OG_Cell({
						id: "publicData",
						name: "公開"　,
						type: CELL_TYPE.CHECK,
						style: "",
						view: "",
						def: "1"
					}),
					new PageModel.OG_Cell({
						id: "id",
						name: "ID ",
						type: CELL_TYPE.SINGLE,
						def: "{SAMPLE_ID}"
					}),
					new PageModel.OG_Cell({
						id: "text",
						name: "値",
						type: CELL_TYPE.SINGLE,
						def: "サンプル値"
					})
				]
			}
		},false);
		this.gridView = new EditableView.BaseGrid(gridType);
		this.gridView.registParent(this);
		this.gridView.initData(_array);
	}
	p.getData = function() {
		var a = this.gridView.getData();
		var list = []
		for (var i = 0; i <  a.length ; i++) {
			if(a[i].id != ""){
				list.push(a[i])	
			}
		}
		return list;
	}
	p.updateSubData = function() {
		//
	}
	return c;
})();


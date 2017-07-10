
var gulp = require("gulp");
var sass = require("gulp-sass");
var pleeease = require('gulp-pleeease');
var sourcemaps = require('gulp-sourcemaps');
var concat = require("gulp-concat")
var plumber = require("gulp-plumber");
var runSequence = require('run-sequence');

/* ! ---------- __val__ ---------- ---------- ---------- ---------- */

var dir = './js_cms/_cms/js';

var js = {
	main:{
		dest:'cms.js',
		src:[
			"./src/js/copyright.js",
			"./src/js/cms_main/index.js",
			"./src/js/cms_main/misk.js",
			"./src/js/cms_main/misk2.js",
			"./src/js/cms_main/misk3.js",
			//
			"./src/js/cms_main/NO_CMSView.js",
			"./src/js/cms_main/CMS_CheckedView.js",
			"./src/js/cms_main/CMS_LoginView.js",

			"./src/js/cms_main/CMS_InitController.js",
			"./src/js/cms_main/CMS_MainController.js",
			"./src/js/cms_main/CMS_LivePreviewController.js",
			"./src/js/cms_main/CMS_StageController.js",
			"./src/js/cms_main/CMS_ModalManager.js",
			"./src/js/cms_main/CMS_SizeManager.js",
			"./src/js/cms_main/CMS_ScreenManager.js",
			"./src/js/cms_main/CMS_KeyManager.js",
			//
			"./src/js/cms_main/CMS_Path.js",
			"./src/js/cms_main/CMS_E.js",
			"./src/js/cms_main/CMS_History.js",
			"./src/js/cms_main/CMS_Status.js",
			"./src/js/cms_main/CMS_ServerStatus.js",
			"./src/js/cms_main/CMS_UtilClass.js",

			"./src/js/cms_main/CMS_RootView.js",
			"./src/js/cms_main/CMS_Header.js",
			"./src/js/cms_main/CMS_AlertView.js",
			"./src/js/cms_main/CMS_AlertLockView.js",
			"./src/js/cms_main/CMS_ConfirmView.js",
			"./src/js/cms_main/CMS_CopyView.js",
			"./src/js/cms_main/CMS_InputView.js",
			"./src/js/cms_main/CMS_ProccessView.js",
			"./src/js/cms_main/CMS_ErrorView.js",
			"./src/js/cms_main/CMS_IntroView.js",
			"./src/js/cms_main/CMS_LOCK.js",

			//
			"./src/js/cms_stage_page/CMS_PageStage.js",
			"./src/js/cms_stage_page/CMS_PagesView.js",
			"./src/js/cms_stage_page/CMS_PageClass.js",
			"./src/js/cms_stage_page/CMS_PageDB.js",
			"./src/js/cms_stage_page/CMS_PageID.js",
			"./src/js/cms_stage_page/CMS_PagesView_ZoomManager.js",
			"./src/js/cms_stage_page/CMS_PageListView.js",
			"./src/js/cms_stage_page/CMS_PageListViewSearch.js",
			"./src/js/cms_stage_page/CMS_PageListViewTree.js",
			"./src/js/cms_stage_page/CMS_PageList_ListDB.js",
			"./src/js/cms_stage_page/CMS_PageList_ListClass.js",
			"./src/js/cms_stage_page/CMS_PageList_PageDB.js",
			"./src/js/cms_stage_page/CMS_PageList_PageClass.js",
			"./src/js/cms_stage_page/CMS_PageList_StateManager.js",

			//
			"./src/js/cms_stage_sidepreview/CMS_SidePreview.js",
			"./src/js/cms_stage_sidepreview/CMS_SidePreviewPage.js",
			"./src/js/cms_stage_sidepreview/CMS_SidePreviewClose.js",

			//
			"./src/js/cms_stage_asset/CMS_AssetStage.js",
			"./src/js/cms_stage_asset/CMS_AssetStageResizeView.js",
			"./src/js/cms_stage_asset/CMS_AssetStageClose.js",
			"./src/js/cms_stage_asset/CMS_Asset_DirArea.js",
			"./src/js/cms_stage_asset/CMS_Asset_FilesArea.js",
			"./src/js/cms_stage_asset/CMS_Asset_FileListView.js",
			"./src/js/cms_stage_asset/CMS_Asset_FileListClass.js",
			"./src/js/cms_stage_asset/CMS_Asset_FileListClass_List.js",
			"./src/js/cms_stage_asset/CMS_Asset_FileListClass_ThumbList.js",
			"./src/js/cms_stage_asset/CMS_Asset_FileListState.js",
			"./src/js/cms_stage_asset/CMS_Asset_FileListU.js",

			"./src/js/cms_stage_asset/CMS_Asset_CreateFileView.js",
			"./src/js/cms_stage_asset/CMS_Asset_UploaderView.js",
			"./src/js/cms_stage_asset/CMS_Asset_UploaderView2.js",
			"./src/js/cms_stage_asset/CMS_Asset_UploadClass.js",
			"./src/js/cms_stage_asset/CMS_Asset_UploaderState.js",
			"./src/js/cms_stage_asset/CMS_Asset_UploadU.js",

			"./src/js/cms_stage_asset/CMS_Asset_FileDetailView.js",
			"./src/js/cms_stage_asset/CMS_Asset_FileEditorView.js",
			"./src/js/cms_stage_asset/CMS_Asset_FileEditorClass.js",
			"./src/js/cms_stage_asset/CMS_Asset_FilePreviewView.js",

			"./src/js/cms_stage_asset/CMS_AssetDB.js",
			"./src/js/cms_stage_asset/CMS_AssetFileU.js",
			"./src/js/cms_stage_asset/CMS_Asset_FileManageAPI.js",


			/* ---------- ---------- ---------- */

			"./src/js/cms_main/TemplateFilesEditor.js",
			"./src/js/cms_main/HTMLService.js",
			"./src/js/cms_main/HTMLService.2.js",
			"./src/js/cms_main/HTMLService.3.js",
			"./src/js/cms_main/DragController.js",
			"./src/js/cms_main/FormCandidates.js",

			"./src/js/cms_data/CMS_Data.MainLoader.js",
			"./src/js/cms_data/CMS_Data.MyTag.p1.js",
			"./src/js/cms_data/CMS_Data.MyTag.p2.js",
			"./src/js/cms_data/CMS_Data.MyTag.p3.js",
			"./src/js/cms_data/CMS_Data.PresetBlock.js",
			"./src/js/cms_data/CMS_Data.Sitemap.js",
			"./src/js/cms_data/CMS_Data.Replace.js",
			"./src/js/cms_data/CMS_Data.Template.js",
			"./src/js/cms_data/CMS_Data.InspectCSS.js",
			"./src/js/cms_data/CMS_Data.FreeFile.js",
			"./src/js/cms_data/CMS_Data.PresetJSON.js",
			"./src/js/cms_data/CMS_Data.AssetFile.js",
			"./src/js/cms_data/CMS_Data.TextLoader.js",

			"./src/js/cms_storage/Storage.js",
			"./src/js/cms_storage/Storage.Embed.js",
			"./src/js/cms_storage/Storage.Local.js",
			"./src/js/cms_storage/Storage.OnlineBatch.js",
			"./src/js/cms_storage/Storage.Online.js",
			"./src/js/cms_storage/Storage.Memo.js",
			"./src/js/cms_storage/Storage.SimpleIO.js",
			"./src/js/cms_storage/Storage.StatusCheck.js",

			"./src/js/cms_util/CMS_U.js",
			"./src/js/cms_util/CMS_FormU.js",
			"./src/js/cms_util/CMS_BlockAttrU.js",
			"./src/js/cms_util/CMS_AnchorU.js",
			"./src/js/cms_util/CMS_AnchorListU.js",
			"./src/js/cms_util/CMS_SaveDateU.js",
			"./src/js/cms_util/CMS_PateStateU.js",
			"./src/js/cms_util/CMS_TemplateU.js",
			"./src/js/cms_util/CMS_TagU.js",
			"./src/js/cms_util/CMS_ImgBlockU.js",
			"./src/js/cms_util/CodeMirrorU.js",
			"./src/js/cms_util/FileU.js",
			"./src/js/cms_util/URL_U.js",
			"./src/js/cms_util/TagU.js",
			"./src/js/cms_util/Treatment.js",
			"./src/js/cms_util/DateUtil.js",
			"./src/js/cms_util/StringU.js",
			"./src/js/cms_util/AnimU.js",
	    ]
	},
	view:{
		dest:'cms.view.js',
		src:[
			"./src/js/copyright.js",
			"./src/js/cms_view_editable/EditableView.js",
			"./src/js/cms_view_editable/EditableView.PageView.js",
			"./src/js/cms_view_editable/EditableView.PageView_U.js",
			"./src/js/cms_view_editable/EditableView.PageView_Revision.js",
			"./src/js/cms_view_editable/EditableView.SubPageView.js",
			//
			"./src/js/cms_view_editable/EditableView.TextPageView.js",
			//
			"./src/js/cms_view_editable/EditableView.GridClass.js",
			"./src/js/cms_view_editable/EditableView.M_Grid.js",
			"./src/js/cms_view_editable/EditableView.BaseBlock.js",
			"./src/js/cms_view_editable/EditableView.BaseTexts.js",
			"./src/js/cms_view_editable/EditableView.BaseTextsU.js",
			"./src/js/cms_view_editable/EditableView.BaseGrid.js",
			"./src/js/cms_view_editable/EditableView.BaseGridState.js",
			"./src/js/cms_view_editable/EditableView.BaseGridU.js",
			"./src/js/cms_view_editable/EditableView.InputU.js",
			"./src/js/cms_view_editable/EditableView.InputFormProvider.js",
			"./src/js/cms_view_editable/EditableView.InputFormProviderGrid.js",
			"./src/js/cms_view_editable/EditableView.InputEvent.js",
			"./src/js/cms_view_editable/EditableView.FreeLayout.js",
			"./src/js/cms_view_editable/EditableView.FreeLayoutCols.js",
			"./src/js/cms_view_editable/EditableView.CustomList.js",
			"./src/js/cms_view_editable/EditableView.CustomListPreset.js",
			"./src/js/cms_view_editable/EditableView.CustomListData.js",
			"./src/js/cms_view_editable/EditableView.CustomListData_Dic.js",

			"./src/js/cms_view_inspect/InspectView.js",
			"./src/js/cms_view_inspect/InspectView.p2.js",
			"./src/js/cms_view_inspect/InspectView.p3.js",
			"./src/js/cms_view_inspect/InspectView.Footer.js",
			"./src/js/cms_view_inspect/InspectView.View.js",
			"./src/js/cms_view_inspect/InspectView.ID.js",
			"./src/js/cms_view_inspect/InspectView.Export.js",
			"./src/js/cms_view_inspect/InspectView.Embed.js",
			"./src/js/cms_view_inspect/InspectView.Embed_U.js",
			"./src/js/cms_view_inspect/InspectView.TextAnchorClass.js",
			"./src/js/cms_view_inspect/InspectView.AnchorClass.js",
			"./src/js/cms_view_inspect/InspectView.FormU.js",
			"./src/js/cms_view_inspect/InspectView.FormU_Img.js",
			"./src/js/cms_view_inspect/InspectView.FormU_Heading.js",
			"./src/js/cms_view_inspect/InspectView.FormU_Preset.js",

			"./src/js/cms_view_floats/AddElements.js",
			"./src/js/cms_view_floats/AddElementsView.js",
			"./src/js/cms_view_floats/AddElementsBtnSet.js",
			"./src/js/cms_view_floats/AddElementsManager.js",
			"./src/js/cms_view_floats/Float_Preview.1.js",
			"./src/js/cms_view_floats/Float_Preview.2.js",
			"./src/js/cms_view_floats/Float_Preview.3.js",
			"./src/js/cms_view_floats/Float_Preview.4.js",
			"./src/js/cms_view_floats/Float_Preview.5.js",
			"./src/js/cms_view_floats/SimpleToolTip.js",
			"./src/js/cms_view_floats/Float_DateInputView.js",
			"./src/js/cms_view_floats/FreeLayoutInfoView.js",
			"./src/js/cms_view_floats/InputCnadidate.js",

			"./src/js/cms_view_modals/ModalViewCreater.js",
			"./src/js/cms_view_modals/MiniEditer.js",
			"./src/js/cms_view_modals/MiniEditer.Editors.js",
			"./src/js/cms_view_modals/MiniEditer.InputView.js",
			"./src/js/cms_view_modals/MiniEditer.CodeView.js",
			"./src/js/cms_view_modals/MiniEditer.CodeViewOption.js",
			"./src/js/cms_view_modals/MiniEditer.PresetClass.js",
			"./src/js/cms_view_modals/Editer_TAGView.js",
			"./src/js/cms_view_modals/Editer_JSONView.js",
			"./src/js/cms_view_modals/Editer_ExcelEdit.js",
			"./src/js/cms_view_modals/Editer_CodeCopyView.js",
			"./src/js/cms_view_modals/Anchor_InputView.js",
			"./src/js/cms_view_modals/Anchor_BtnView.js",
			"./src/js/cms_view_modals/Anchor_PageListView.js",
			"./src/js/cms_view_modals/Anchor_TargetListView.js",
			"./src/js/cms_view_modals/Preset_IconView.js",
			"./src/js/cms_view_modals/Preset_CSSView.js",
			"./src/js/cms_view_modals/Preset_ClassView.js",
			"./src/js/cms_view_modals/ServerInfoView.js",
			"./src/js/cms_view_modals/SitemapEditView.js",

			"./src/js/cms_view_modals/PresetStageView.1.js",
			"./src/js/cms_view_modals/PresetStageView.2.js",
			"./src/js/cms_view_modals/PresetStageView.3.js",
			"./src/js/cms_view_modals/PresetStageView.4.js",
			"./src/js/cms_view_modals/PresetStageView.5.js",


			"./src/js/cms_view_modals/GadgetListView.js",
			"./src/js/cms_view_modals/EmbedTagListView.js",
			"./src/js/cms_view_modals/MyTagListView.js",
			"./src/js/cms_view_modals/CMS_GuideView.js",
			"./src/js/cms_view_modals/CMS_GuideView.p2.js",
			"./src/js/cms_view_modals/FileInfoView.js",
			"./src/js/cms_view_modals/FileInfoViewU.js",
			"./src/js/cms_view_modals/FileInfoU.js",

			"./src/js/cms_view_modals/DirListView.js",
			"./src/js/cms_view_modals/DirTreeViewTest.js",
			"./src/js/cms_view_modals/DirTreeViewNode.js",
			"./src/js/cms_view_modals/DummyImageService.js",
			"./src/js/cms_view_modals/DummyImageView.js",

			//
			"./src/js/cms_view_imagemap/ImageMap.01.js",
			"./src/js/cms_view_imagemap/ImageMap.02.js",
			"./src/js/cms_view_imagemap/ImageMap.03.js",
			"./src/js/cms_view_imagemap/ImageMap.04.js",
			"./src/js/cms_view_imagemap/ImageMap.05.js",
			"./src/js/cms_view_imagemap/ImageMap.06.js",
			"./src/js/cms_view_imagemap/ImageMap.u1.js",
			"./src/js/cms_view_imagemap/ImageMap.u2.js",
			"./src/js/cms_view_imagemap/ImageMap.u3.js",
			"./src/js/cms_view_imagemap/ImageMap.u4.js",
			"./src/js/cms_view_imagemap/ImageMap.u5.js",

			"./src/js/cms_view_modals/BackupView.js",
			"./src/js/cms_view_modals/BackupTargetView.js",
			"./src/js/cms_view_modals/BackupCreateView.js",
			"./src/js/cms_view_modals/BackupListView.js",
			"./src/js/cms_view_modals/BackupU.js",

			"./src/js/cms_view_modals/BatchPublishView.js",
			"./src/js/cms_view_modals/BatchQueueControllClass.js",
			"./src/js/cms_view_modals/BatchPublishQueueClass.js",

			"./src/js/cms_main/TreeAPI.js",
	 		"./src/js/cms_main/TreeViewMakerPreset.js",
	 		"./src/js/cms_main/TreeViewMakerView.js",
	 		"./src/js/cms_main/TreeViewMakerView_DirList.js",
	 		"./src/js/cms_main/TreeViewMakerView_PageList.js",
	 		"./src/js/cms_main/TreeViewMakerView_TagList.js",
	 		"./src/js/cms_main/TreeViewMakerViewEditor.js",

	    ]
	},
    model:{
		dest:'cms.model.js',
		src:[
			"./src/js/copyright.js",
			"./src/js/cms_model/Dic.js",

			"./src/js/cms_model/PageModel.js",
			"./src/js/cms_model/PageModel.Tag_.js",
			"./src/js/cms_model/PageModel.Object_.js",
			"./src/js/cms_model/PageModel.Object_Info.js",
			"./src/js/cms_model/PageModel.Object_Grid.js",
			"./src/js/cms_model/PageModel.OG_info.js",
			"./src/js/cms_model/PageModel.OG_SubInfo.js",
			"./src/js/cms_model/PageModel.OG_Cell.js",

			"./src/js/cms_model/PageTypeList.js",
			"./src/js/cms_model/PageTypeList.free.js",

			"./src/js/cms_model/PageElement.js",
			"./src/js/cms_model/PageElement_JText.js",
			"./src/js/cms_model/PageElement_Util.js",
			"./src/js/cms_model/PageElement_HTMLService.js",

			"./src/js/cms_model/PageElement.tag.js",
			"./src/js/cms_model/PageElement.tag.heading.js",
			"./src/js/cms_model/PageElement.tag.p.js",
			"./src/js/cms_model/PageElement.tag.code.js",
			"./src/js/cms_model/PageElement.tag.blockquote.js",
			"./src/js/cms_model/PageElement.tag.btn.js",
			"./src/js/cms_model/PageElement.tag.anchor.js",
			"./src/js/cms_model/PageElement.tag.img.js",
			"./src/js/cms_model/PageElement.tag.margin.js",
			"./src/js/cms_model/PageElement.tag.note.js",
			"./src/js/cms_model/PageElement.tag.place.js",
			"./src/js/cms_model/PageElement.tag.html.js",
			"./src/js/cms_model/PageElement.tag.js.js",
			"./src/js/cms_model/PageElement.tag.markdown.js",

			"./src/js/cms_model/PageElement.layout.js",
			"./src/js/cms_model/PageElement.layout.div.js",
			"./src/js/cms_model/PageElement.layout.cols.js",
			"./src/js/cms_model/PageElement.layout.colDiv.js",

			"./src/js/cms_model/PageElement.replace.js",
			"./src/js/cms_model/PageElement.replace.div.js",

			"./src/js/cms_model/PageElement.object.js",
			"./src/js/cms_model/PageElement.object.list.js",
			"./src/js/cms_model/PageElement.object.dl.js",
			"./src/js/cms_model/PageElement.object.talk.js",
			"./src/js/cms_model/PageElement.object.table.js",
			"./src/js/cms_model/PageElement.object.news.js",
			"./src/js/cms_model/PageElement.object.newsB.js",
			"./src/js/cms_model/PageElement.object.images.js",
			"./src/js/cms_model/PageElement.object.btnList.js",
			"./src/js/cms_model/PageElement.object.pageLink.js",

			"./src/js/cms_model/PageElement.object.photos.js",
			"./src/js/cms_model/PageElement.object.slides.js",
			"./src/js/cms_model/PageElement.object.carrousel.js",

			"./src/js/cms_model/PageElement.object.tabList.js",
			"./src/js/cms_model/PageElement.object.pagenation.js",
			"./src/js/cms_model/PageElement.object.share.js",
			"./src/js/cms_model/PageElement.object.feed.js",
			"./src/js/cms_model/PageElement.object.formMail.js",
			"./src/js/cms_model/PageElement.object.repeat.js",

			"./src/js/cms_model/PageElement.object.replaceTexts.js",
			"./src/js/cms_model/PageElement.object.tree.js",
			"./src/js/cms_model/PageElement.object.hinagata.js",

			"./src/js/cms_model/PageElement.object.data_csv.js",
			"./src/js/cms_model/PageElement.object.data_json.js",
			"./src/js/cms_model/PageElement.object.data_xml.js",
			"./src/js/cms_model/PageElement.object.data_rss.js",
			"./src/js/cms_model/PageElement.object.data_text.js",

			"./src/js/cms_model/PageElement.object.test.js"
	    ]
    }
}


/* ! ---------- __val__ ---------- ---------- ---------- ---------- */

gulp.task('concat:cms.js', function() {
	var a = []
	a = a.concat(js.main.src)
	a = a.concat(js.view.src)
	a = a.concat(js.model.src)
  return gulp.src(a)
    .pipe(concat(js.main.dest))
    .pipe(gulp.dest(dir))
});

gulp.task('concat:js', function(callback) {
  return runSequence(
    'concat:cms.js',
    callback
  );
});

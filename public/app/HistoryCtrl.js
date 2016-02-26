'use strict';
angular.module('FileSync').controller('HistoryCtrl', ['$scope','HistoryService', 'SocketIOService', 'VisibilityService',
function ($scope, HistoryService,SocketIOService,VisibilityService) {

  this.edits = HistoryService.edits;


//Move a lot of these into HistoryService.//
  this.visibility = VisibilityService;
  this.listModifiedFiles = HistoryService.listModifiedFiles;
  this.fileSelected;
  this.versionList;
  this.listIsEmpty = _.isEmpty(this.listModifiedFiles);


  this.rewriteDate=function(){
    console.log(this.versionList);
    this.versionList.map(x=>x.time = new Date(parseInt(x.time)));
    console.log(this.versionList);
  }
  this.showFile=function(file){

    this.fileSelected = file;
    console.log(file);//
    SocketIOService.askForHistory(file.filename);

  }
  this.remove = function (edit) {
    HistoryService.remove(edit);
  };//
  this.addComment = function(edit){
    HistoryService.addComment(edit, this.newComment);
    this.newComment="";
  }
  function onComment(edits){
    this.edits = [];
    $scope.$apply();
  }


  function newHistory(history){

    this.listIsEmpty = _.isEmpty(this.listModifiedFiles);
    this.versionList = history;
    this.rewriteDate();//
    $scope.$apply();
  }
  SocketIOService.newHistory(newHistory.bind(this));
  SocketIOService.onComment(onComment.bind(this));



}]);

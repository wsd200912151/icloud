
    var app=angular.module('icloub',[]);
    //添加列表项
    app.directive('ngColorUl',[function(){
        return{
            restrict:'AE',
            replace:true,
            transclude:true,
            template:'<ul class="uls"><div ng-transclude></div></ul>',
             link:function(scope,el){
                $(el).on('click','li',function(){
                    $(el).find('li').removeClass('bg dblclick prevtop nextbottom');
                    $(this).addClass('bg');
                    $(this).prev().addClass('prevtop');
                    $(this).next().addClass('nextbottom');
                })
                $(el).on('mousedown',false);
                $(el).on('dblclick','li',function(){
                    $(this).addClass('dblclick');
                    var input=$(this).find('input');
                    input.val(input.val()).focus();
                })
                $(el).on('blur','li input',function(){
                    $(this).closest('li').removeClass('dblclick');
                    var text=$(this).val();
                    $(this).closest('li').find('span.til').text(text);
                })
                $(document).on('keyup',function(e){
                    if(e.keyCode===46){
                        var id=parseInt($('.bg').attr('date-attr'));
                        scope.$apply(function(){
                            scope.things=scope.things.filter(function(v){
                                return v.id!==id;
                            })
                        })
                    }
                })
            }
        }
    }])

    //添加事项
    app.directive('ngListUl',[function(){
        return{
            restrict:'AE',
            replace:true,
            transclude:true,
            template:'<ul class="completing"><div ng-transclude></div></ul>',
            link:function(scope,el){
                $('.push').on('click',function(){
                    var id=0;
                    scope.current.todos.forEach(function(v,i){
                        if(id < v.id){
                            id=v.id;
                        }
                    })
                    var to={id:id+1,title:'',isFin:0};
                    scope.$apply(function(){
                        scope.current.todos.push(to);
                    })
                    var i=scope.current.todos.length;
                    // console.log(i)
                    $(el).find("li[date-id='"+i+"'] input").focus();
                })
                $(el).on('blur','li input',function(){
                    var i=scope.current.todos.length;
                    var val=$(el).find("li[date-id='"+i+"'] input").val();
                    scope.current.todos[i-1].title=val;
                    // console.log(val)
                })

                $('.right-box .complete span.overflow').on('click',function(){
                    $(this).toggleClass('block');
                    $('.right-box ul.completed').toggleClass('overflow');
                })


            }
        }
    }])

    //数据
    app.controller('mainCtrl',['$scope',function($scope){
        $scope.theme=["color1","color2","color3","color4","color5","color6","color7"];
        // $scope.color=[#ff7f00,#1DB2F8,#e0ac00,#b14bc9,#49bf1f,#a2845e,#ff2968];
        $scope.things=[
            {   id:1001,
                theme:$scope.theme[0],
                color:$scope.theme[0],
                title:'新列表1',
                todos:[
                    {id:1,title:1,isFin:1},
                    {id:2,title:2,isFin:0},
                    {id:3,title:3,isFin:1},
                    {id:4,title:4,isFin:1}
                ]
            }
            ,
            {id:1002,theme:$scope.theme[1],color:$scope.theme[1],title:'新列表2',todos:[]},
            {id:1003,theme:$scope.theme[2],color:$scope.theme[2],title:'新列表3',todos:[]},
            {id:1004,theme:$scope.theme[3],color:$scope.theme[3],title:'新列表4',todos:[]}
        ];
        $scope.add=function(){
            var id=-Infinity;
            var title=-Infinity;
            $scope.things.forEach(function(v,i){
                if(id < v.id){
                    id=v.id;
                }
                var ti=parseInt(v.title.charAt(3));
                if(title < ti){
                    title=ti;
                }
            })
            var item={
                id:id+1,
                theme:$scope.theme[$scope.things.length%7],
                color:$scope.theme[$scope.things.length%7],
                title:'新列表'+( title+1 ),
                todos:[
                    // {id:1,title:1,isFin:1},
                    // {id:2,title:2,isFin:0},
                    // {id:3,title:3,isFin:1},
                    // {id:4,title:4,isFin:1}
                ]
            }
            $scope.things.push(item);
        }

        $scope.current=$scope.things[0];
        $scope.change=function(v){
            $scope.current=v;
        }
        $scope.delete=function(id){
            $scope.current.todos=$scope.current.todos.filter(function(v){
                //返回留下的数据
                return v.id!==id;
            })
        }
        $scope.completedPlus=function(){
            var num=0;
            for(var i=0;i<$scope.current.todos.length;i++){
                if($scope.current.todos[i].isFin==1){
                    num+=1;
                }
            }
            return num;
        }
        $scope.class=function(){
            var num=$('.right-box .complete .com span').text();
            if(num==0){
                return overflow;
            }
        }

        $scope.setcolors=[
            {id:01,color:$scope.theme[0]},
            {id:02,color:$scope.theme[1]},
            {id:03,color:$scope.theme[2]},
            {id:04,color:$scope.theme[3]},
            {id:05,color:$scope.theme[4]},
            {id:06,color:$scope.theme[5]},
            {id:07,color:$scope.theme[6]}
        ];
        $scope.del=function(id){
            var newarr=[];
            for(var i=0;i<$scope.things.length;i++){
                if(Number($scope.things[i].id)!==id){
                    newarr.push($scope.things[i]);
                }
            }
            $scope.things=newarr;
            $scope.current=$scope.things[0];
        }
        $scope.cancel=function(id){
            $scope.newtheme=$scope.things.filter(function(v){
                //返回留下的数据
                return v.id==id;
            })
            return $scope.newtheme[0].color;
        }
        $scope.com=function(){
            $('.set').addClass('block');
            $('.sanjiao').addClass('block');
        }


    }])


$(function(){
    $('.set .set-mid .colors .color').on('click',function(){
        $('.set .set-mid .colors').find('.cir').removeClass('block');
        $(this).find('.cir').addClass('block');
    })
    $('.right-box .new-event .change').on('click',function(){
        $('.set').toggleClass('block');
        $('.sanjiao').toggleClass('block');
    })
})


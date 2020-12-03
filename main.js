new Vue({
    'el':'#app',
    'data':{
        title:'list of lang',
        list:['ar','en','fr'],
        newitem:''
    },
    'methods':{
        DeleteItem:function(lang){
            var index = this.list.indexOf(lang);
            this.list.splice(index,1);

        },
        Additem:function(){
            this.list.push(this.newitem);
            this.newitem='';
        }
    }

});
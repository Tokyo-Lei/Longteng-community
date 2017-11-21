/**
 * Created by hama on 2017/9/18.
 */
//用户信息表
const mongoose = require('mongoose');
//引入shortid生成ID的插件
const shortid = require('shortid');
const Schema = mongoose.Schema;
const BaseModel = require('./base_model');
const UserSchema = new Schema({
    //定义字段
    _id:{
        type:String,
        default:shortid.generate,
        unique:true
    },
    //用户名
    name:{
        type:String,
        required:true
    },
    //密码
    password:{
        type:String,
        required:true
    },
    //邮箱
    email:{
        type:String,
        required:true
    },
    //个人简介
    motto:{
        type:String,
        default:'这家伙很懒,什么都没有留下...'
    },
    //个人头像
    avatar:{
        type:String,
        default:'/images/default-avatar.jpg'
    },
    //创建时间
    create_time:{
        type:Date,
        default:Date.now
    },
    //修改时间
    update_time:{
        type:Date,
        default:Date.now
    },
    //用户的积分
    score:{
        type:Number,
        default:0
    },
    //用户发表的文章数量
    article_count:{
        type:Number,
        default:0
    },
    //用户回复的数量
    reply_count:{
        type:Number,
        default:0
    },
    //人物互相关注表
    eachother:{
        type:String,
        ref:'FollowUser'
    },
    //用户关注的问题
    followQustion:{
        type:[],
        ref:'Question'
    }
})
//给这个User表添加静态方法
UserSchema.statics = {
    getUserByName:(name,callback)=>{
        // console.log(name);
        User.findOne({name:name}).populate('eachother').exec(callback);
        // User.find({name:name}).populate('eachother').exec(callback);
    },

    getUserByEmail:(email,callback)=>{
        User.findOne({email:email},callback)
    },
    getUserById:(id,callback)=>{
        User.findOne({_id:id},callback)
    },
    getUserByNames:(names,callback)=>{
        if(names.length == 0){
            return callback(null,[]);
        }
        User.find({name:{$in:names}}).populate('eachother').exec(callback);
    },
    getUserByNameEacheother:(user_id,callback)=>{
        User.findOne({name:user_id}).populate('eachother').exec(callback);
    }
}
UserSchema.plugin(BaseModel);
const User = mongoose.model('User',UserSchema);
module.exports = User

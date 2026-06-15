const fs = require('fs');
fs.readFileSync('.env.local','utf8').split(/\r?\n/).filter(Boolean).forEach(l=>{const m=l.match(/([^=]+)=(.*)/); if(m) process.env[m[1]]=m[2]});
const cloudinary = require('cloudinary').v2;
cloudinary.config({cloud_name:process.env.CLOUDINARY_CLOUD_NAME, api_key:process.env.CLOUDINARY_API_KEY, api_secret:process.env.CLOUDINARY_API_SECRET, secure:true});
const url = cloudinary.url('tmtech-resumes/5ff8941c-e60c-461d-bfe2-e0ad67853ba1.pdf',{resource_type:'raw', type:'upload', secure:true, sign_url:true});
console.log(url);

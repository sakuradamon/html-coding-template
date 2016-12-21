$(function(){

    var forms = $('[data-role="form-group"]');
    var formValues = {
        type: "",
        name: "",
        email: "",
        company: "",
        subject: "",
        content: ""
    };

    var contact_validation = function() {
        var that = $(this);
        var name = that.attr('name');
        var group = that.parents('[data-role="form-group"]');
        var error = false;
        var errorText = "";
        formValues[name] = that.val();
        switch (name) {
            case 'name' :
            error = (formValues[name].length < 1);
            errorText = "氏名を入力してください";
            break;
            case 'email' :
            if (formValues[name].length < 1) {
                error = true;
                errorText = "メールアドレスを入力してください";
            } else if (!validateMailAddress_(formValues[name])) {
                error = true;
                errorText = "正しいメールアドレスを入力してください";
            }
            break;
            case 'email-confirm' :
            if (formValues[name].length < 1) {
                error = true;
                errorText = "メールアドレスを入力してください";
            } else if (formValues['email'] != formValues['email-confirm']) {
                error = true;
                errorText = "上記のメールアドレスと異なります";
            }
            break;
            case 'subject' :
            if (formValues[name] == "") {
                error = true;
                errorText = "件名を選択してください";
            }
            break;
            case 'content' :
            error = (formValues[name].length < 1);
            errorText = "お問い合わせ内容を入力してください";
            break;
        }
        if (error) {
            if(errorText != "") {
                group.prepend("<p class='p-input-error'>"+errorText+"</p>")
            }
        } else {
            group.find('.p-input-error').remove();
        }
        return !error;
    }

    // 初期化
    $("p.p-input-error").remove();
    forms.find('[data-role="form"]').on('blur', contact_validation);

    // 送信ボタン
    $('[data-btn=submit]').on('click', function(e){

        // 送信処理を書く

        return e.preventDefault();
    });

    var validateMailAddress_ = function(mail_address) {
        var pattern = /^(?:(?:(?:(?:[a-zA-Z0-9_!#\$\%&'*+/=?\^`{}~|\-]+)(?:\.(?:[a-zA-Z0-9_!#\$\%&'*+/=?\^`{}~|\-]+))*)|(?:"(?:\\[^\r\n]|[^\\"])*")))\@(?:(?:(?:(?:[a-zA-Z0-9_!#\$\%&'*+/=?\^`{}~|\-]+)(?:\.(?:[a-zA-Z0-9_!#\$\%&'*+/=?\^`{}~|\-]+))*)|(?:\[(?:\\\S|[\x21-\x5a\x5e-\x7e])*\])))$/;
        return pattern.test(mail_address);
    };

});

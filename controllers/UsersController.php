<?php

class UsersController extends Controller {

    const JSON_RESPONSE_ROOT_SINGLE = 'user';
    const JSON_RESPONSE_ROOT_PLURAL = 'users';

    public function actionIndex() {

        $Criteria = new CDbCriteria();
        //   $Criteria->condition = "isDelete = 0";
        $models = User::model()->findAll();
        $json = $this->arrtoJson(self::JSON_RESPONSE_ROOT_PLURAL, $models);
        $this->sendResponse(200, $json);
    }

    public function actionCreate() {

        $request = $this->getClientPost();
        $post = $request[self::JSON_RESPONSE_ROOT_SINGLE];
        $model = new User;
        $date = new DateTime();
        $model->setAttributes($post);
        $record = null;
        if (!is_null($post["email"])) {
            $record = User::model()->find(array(
                'condition' => 'email=:email',
                'params' => array(':email' => $post["email"]))
            );
        } else {
            $model->email = "not provide yet.";
        }

        $model->created_date = $date->format('Y-m-d H:i:s');
        $model->updated_date = $date->format('Y-m-d H:i:s');

        if (is_null($model['password'])) {
            $model->password = "Pa55word";
        }
        if (is_null($model['group'])) {
            $model->group = "2";
        }

        $active = (string) $model['active'];
        $model->active = $active;
        if (is_null($record)) {

            if ($model->validate()) {
                $model->save(false);
                if (!is_null($post["email"])) {
                    $this->sendWelcomeEmail($post["email"]);
                }
                $this->sendResponse(204);
            } else {
                error_log("false");
                error_log(var_export($model, true));
                $this->sendResponse(500);
            }
        } else {
            $this->sendResponse(451, "email_exist");
        }
    }

    public function actionRead() {
//        $temp = explode("/", $_SERVER['REQUEST_URI']);
//        $id = $temp [sizeof($temp) - 1];
//        $model = User::model()->findByPk($id);
//        $json = $this->objtoJson(self::JSON_RESPONSE_ROOT_SINGLE, $model);
//
//        $this->sendResponse(200, $json);
        echo "read";
    }

    public function actionUpdate() {
        $request = $this->getClientPost();
        $user = $request['user'];
        $temp = explode("/", $_SERVER['REQUEST_URI']);
        $id = $temp [sizeof($temp) - 1];
        $model = User::model()->findByPk($id);
        $model->setAttributes($user);
        $active = (string) $user['active'];
        $model->active = $active;
        if ($model->validate()) {
            $model->save(false);
            $this->sendResponse(204);
        } else {
            $this->sendResponse(500);
        }
    }

    public function actionDelete() {
        $temp = explode("/", $_SERVER['REQUEST_URI']);
        $id = $temp [sizeof($temp) - 1];
        $model = User::model()->findByPk($id);

        if ($model->validate()) {
            $model->delete();
            $this->sendResponse(204);
        } else {

            $this->sendResponse(500);
        }
    }

    public function actionChecksocialID() {
        $temp_request = $this->getClientPost();

        $request = CJSON::decode($temp_request, true);

        $reponse = User::model()->findByAttributes(
                array("facebook_id" => $request["social_media_id"])
        );
        if (isset($reponse) && $reponse != "") {
            echo $reponse->attributes["id"];
// $this->sendResponse(200, $reponse->attributes["user_id"]);
        } else {
            echo "ID_NOT_FOUND";
// $this->sendResponse(200, "ID_NOT_FOUND");
        }
    }
  public function actionTest()
{
echo "test";
}

    private function sendWelcomeEmail($emailto) {

//        $mail = new JPhpMailer;
//        $mail->IsSMTP();
//        $mail->Host = 'smtp.googlemail.com:465';
//        $mail->SMTPSecure = "ssl";
//        $mail->SMTPAuth = true;
//        $mail->Username = "kingsley@hubstar.co";
//        $mail->Password = "hubstarhuang";
//        $mail->SetFrom('kingsley@hubstar.co', 'kingsley');
//        $mail->Subject = "Welcome to Kingsley's Gladeye test project";
//        $mail->AltBody = 'To view the message, please use an HTML compatible email viewer!';
//        $mail->MsgHTML('<h1>Welcome!</h1><div>Your account have been created.</div>');
//        $mail->AddAddress($emailto, '');
//        $mail->Send();
        
        $msg = "'<h1>Welcome!</h1><div>Your account have been created.</div>";

// use wordwrap() if lines are longer than 70 characters
$msg = wordwrap($msg,70);
$headers = 'From: huangkingsley@gmail.com' . "\r\n" .
    'Reply-To: huangkingsley@gmail.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

// send email
mail($emailto,"Welcome to Kingsley's user test project",$msg,$headers);
        
    }

}

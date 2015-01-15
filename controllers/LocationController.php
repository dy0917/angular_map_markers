<?php

class LocationController extends Controller {

    const JSON_RESPONSE_ROOT_SINGLE = 'location';
    const JSON_RESPONSE_ROOT_PLURAL = 'locations';

    public function actionIndex() {

        $Criteria = new CDbCriteria();
        //   $Criteria->condition = "isDelete = 0";
        $models = Location::model()->findAll();
        $json = $this->arrtoJson(self::JSON_RESPONSE_ROOT_PLURAL, $models);
        $this->sendResponse(200, $json);
    }

    public function actionCreate() {
 $request = $this->getClientPost();
 $request=json_decode($request, true);
//   $this->sendResponse(200, $request[id]);
     $model = new Location;
//        $date = new DateTime();
        $model->setAttributes($request['location']);
           if ($model->validate()) {
                $model->save(false);
                $this->sendResponse(204);
            } else
            {
                  $this->sendResponse(500);
            }
 
// $json = $this->arrtoJson(self::JSON_RESPONSE_ROOT_PLURAL, $request);
//         $this->sendResponse(200, "createee");
    }

    public function actionRead() {
         $model = Location::model()->findByPk(2);
                 $json = $this->objtoJson(self::JSON_RESPONSE_ROOT_SINGLE, $model);

        $this->sendResponse(200, $json);
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
         $this->sendResponse(200, "delete");
    }

    public function actionChecksocialID() {
        
    }

    public function actionTest() {
       // $request = $this->getClientPost();
         $this->sendResponse(200, "aaaaaaaaaaaaaaaaaaaa");
    }

    private function sendWelcomeEmail($emailto) {
        
    }

}

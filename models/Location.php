<?php

/**
 * This is the model class for table "user".
 *
 * The followings are the available columns in table 'user':
 * @property integer $id
 * @property string $first_name
 * @property string $last_name
 * @property string $email
 * @property string $password
 * @property integer $group
 * @property integer $active
 * @property string $created_date
 * @property string $updated_date
 * @property string $facebook_id
 * @property string $twitter_id
 *
 * The followings are the available model relations:
 * @property Group $group0
 */
class Location extends CActiveRecord {

    /**
     * @return string the associated database table name
     */
    public function tableName() {
        return 'location';
    }

    /**
     * @return array validation rules for model attributes.
     */
    public function rules() {
        // NOTE: you should only define rules for those attributes that
        // will receive user inputs.
        return array(
            array('title, addr, phone, desc, lat, lng, spotImgUrl, imagUrl', 'required'),
//            array('group, active', 'numerical', 'integerOnly' => true),
//            array('first_name, last_name, email, password, facebook_id, twitter_id', 'length', 'max' => 45),
//            array('created_date, updated_date', 'safe'),
            // The following rule is used by search().
            // @todo Please remove those attributes that should not be searched.
            array('id, title, addr, phone, desc, lat, lng, spotImgUrl, imagUrl', 'safe', 'on' => 'search'),
        );
    }

    /**
     * @return array relational rules.
     */
    public function relations() {
        // NOTE: you may need to adjust the relation name and the related
        // class name for the relations automatically generated below.
        return array(
            'group0' => array(self::BELONGS_TO, 'Group', 'group'),
        );
    }

    /**
     * @return array customized attribute labels (name=>label)
     */
    public function attributeLabels() {
        return array(
            'id' => 'ID',
            'title' => 'Title',
            'addr' => 'Address',
            'phone' => 'Phone',
            'desc' => 'Desc',
            'lat' => 'lat',
            'lng' => 'lng',
            'spotImgUrl' => 'spotImgUrl',
            'imagUrl' => 'imagUrl',
        );
    }

    /**
     * Retrieves a list of models based on the current search/filter conditions.
     *
     * Typical usecase:
     * - Initialize the model fields with values from filter form.
     * - Execute this method to get CActiveDataProvider instance which will filter
     * models according to data in model fields.
     * - Pass data provider to CGridView, CListView or any similar widget.
     *
     * @return CActiveDataProvider the data provider that can return the models
     * based on the search/filter conditions.
     */
    public function search() {
        // @todo Please modify the following code to remove attributes that should not be searched.

        $criteria = new CDbCriteria;

//        $criteria->compare('id', $this->id);
//        $criteria->compare('title', $this->first_name, true);
//        $criteria->compare('last_name', $this->last_name, true);
//        $criteria->compare('email', $this->email, true);
//        $criteria->compare('password', $this->password, true);
//        $criteria->compare('group', $this->group);
//        $criteria->compare('active', $this->active);
//        $criteria->compare('created_date', $this->created_date, true);
//        $criteria->compare('updated_date', $this->updated_date, true);
//        $criteria->compare('facebook_id', $this->facebook_id, true);
//        $criteria->compare('twitter_id', $this->twitter_id, true);

        return new CActiveDataProvider($this, array(
            'criteria' => $criteria,
        ));
    }

    /**
     * Returns the static model of the specified AR class.
     * Please note that you should have this exact method in all your CActiveRecord descendants!
     * @param string $className active record class name.
     * @return User the static model class
     */
    public static function model($className = __CLASS__) {
        return parent::model($className);
    }

    public function validatePassword($password) {

        return $this->password == $password;
    }

}

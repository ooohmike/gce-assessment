### 1. Install XAMPP or LAMP environment to setup php and mysql and turn on mysql service


### 2. Run below command to install dependencies and migrate users table to db

```
composer install

php artisan migrate
```

### 3. Run the project

```
php artisan serve
```

Go to http://localhost/users

Enjoy!
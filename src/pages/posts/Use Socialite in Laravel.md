---
layout: ../../layouts/MarkdownPostLayout.astro
title: "Use Socialite in Laravel"
pubDate: 2022-04-20T15:20:15+08:00
description: 在Laravel中，使用Socialite 来集成第三方登录
---


在Laravel中，我们可以使用Socialite库来进行第三方认证登录。
本文简单描述一下使用的过程：
### 1、安装Socialite

```
composer require laravel/socialite
```

### 2、添加配置文件

在`config/services.php`文件中添加：
``` 
'github' => [
    'client_id' => env('GITHUB_CLIENT_ID'),
    'client_secret' => env('GITHUB_CLIENT_SECRET'),
    'redirect' => 'http://127.0.0.1/auth/callback/',
],
```
同时，需要在`.env`文件中添加两处变量：
`GITHUB_CLIENT_ID`、`GITHUB_CLIENT_SECRET`。其中`GITHUB_CLIENT_ID`来自于GitHub账户的`Developer settings`->`OAuth Apps`新建应用的`Client ID`，`GITHUB_CLIENT_SECRET`亦是该新建应用的`Client_Secret`.(在新建应用时，`Authorization callback URL`处添加的地址可以使用本地地址，比如说127.0.0.1或者localhost之类的)

### 3、添加route路由

修改`route\web.php`文件：
```
use Laravel\Socialite\Facades\Socialite;

//定义点击登录按钮后的跳转路径
Route::get('/auth/redirect', function () {
    return Socialite::driver('github')->redirect();
});

 //定义认证后的返回路径
Route::get('/auth/callback', function () {
    $user = Socialite::driver('github')->user();
 
    dd($user);
});
```

### 4、view 页面调整
主要是registe页面和login页面，在相应位置添加登录按钮
![view](/assets/post/post/0420/view.png)
ButtonLink component是复制Button组件修改了一下

### 5、测试
浏览器访问http://127.0.0.1/login查看页面并选择github登录，登录成功后，应该会出现用户信息；

### 6、保存数据
- 在create_user_table的迁移文件中修改：
  
```
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password')->nullable();
            $table->string('github_id')->nullable();
            $table->string('github_token')->nullable();
            $table->string('github_refresh_token')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

```

- 运行`php artisan migrate`
- 修改 `route\web.php`文件的callback函数：
  
```
use App\Models\User;
use Illuminate\Support\Facades\Auth;

Route::get('/auth/callback', function () {
    $githubUser = Socialite::driver('github')->user();
 
    $user = User::updateOrCreate([
        'github_id' => $githubUser->id,
    ], [
        'name' => $githubUser->name,
        'email' => $githubUser->email,
        'github_token' => $githubUser->token,
        'github_refresh_token' => $githubUser->refreshToken,
    ]);
 
    Auth::login($user);
 
    return redirect('/dashboard');
});

```

- 修改`App\Models\User.php`：
  
```
/**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'github_id',
        'github_token',
        'github_refresh_token',
    ];
```

或者将该段删掉，同时在`AppServiceProvider.php`中修改

```
/**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //add this 
        Model::unguard();
    }
```
### 7、继续测试，应该正常了！
撒花
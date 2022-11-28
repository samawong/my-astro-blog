---
layout: ../../layouts/MarkdownPostLayout.astro
title: "use Factory and Seeder in laravel"
pubDate: 2022-04-16T22:35:15+08:00
description: 在laravel中，使用Factory或Seeder生成测试数据
---


在laravel中，我们在创建完model后，如果需要添加测试数据来进行测试，可以使用Factory或Seeder来简单生成测试数据。
本文简单描述一下这两者的使用的过程：
# Factory
Factory,字面意思就是工厂，工厂嘛，就是批量生产的意思，在使用laravel脚手架生成项目目录时，会在database\factories目录下，生成一个UserFactory.php的文件,在文件的definition()函数里，有官方默认的对User的部分字段的faker定义：
```
public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
        ];
    }
```
这里的``` $this->faker ```用的是[Faker PHP库](https://fakerphp.github.io/)，主要是用他来生成字段的测试内容。

在这里，我新建了一个Post模型，User和Post两者是一对多的关系，其中Post主要有两个字段，title和body，还有一个user_id来连接User模型，我们使用Factory来生成测试数据。
1、生成PostFactory文件：
``` 
php artisan make:factory PostFactory -m Post
```
后缀' -m Post'字面上是该factory跟Post模型绑定在一起，我对比了一下生成的factory代码，好像就只有代码里的第8行最后的model字段修改了一下，如果带'-m'参数，则该行第8行的注释就详细到那个model,如果没有该字段，则就只有默认的model，上图：
![使用'-m'参数时的第8行代码对比](/assets/post/0416/post_model-1.png)

然后在该PostFactory.php文件内新增如下代码：
![PostFactory.php字段faker定义](/assets/post/0416/post_model-2.png),其中，``` $this->faker->sentence()```可以创建一个默认是6个词的句子。

这样，Post模型的字段测试代码也基本完成，接下来就是如何使用了，简单的测试使用时，首先运行``` php artisan tinker```，接下来可以运行的语句就多了，比如说``` User::factory()->has(App\Models\Post::factory()->count(3))->make();```,可以测试生成语句是否正确，如果需要将数据写入数据库，只需将最后的```make()```换成```create()```即可。如下图所示：
![create()->saveindatabase](/assets/post/0416/user-post-hasmany-create-one-1.png)
同时，数据库内也可查询到生成的数据：
![create()->saveindatabase](/assets/post/0416/user-post-hasmany-create-one-2.png)

当然，上面的语句也可以写成如下这样：
``` User::factory()->hasposts()->count(3)->create();```
或
``` User::factory(3)->hasposts()->create();```
*两条语句结果一样，都是生成3条User信息并各自对应1条post内容*


# Seeder
Seeder的使用相对简单一些，在脚手架生成的默认文件里，在database\seeders目录内，相对应的，也有默认的seeder文件：DatabaseSeeder.php，打开后，我们可以看到里面关键的应该是run()函数，里面注释的一句代码``` // \App\Models\User::factory(10)->create(); ```,跟上面的factory的生成代码何其相似，所以，会不会是只需要将上述的factory运行代码写入这里即可？简单测试一下：修改DatabaseSeeder.php页面内的代码，在上述注释代码下新增上文我们运行正确的语句：
```
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        User::factory(3)->hasposts()->create();
    }
}
```
,保存后，运行``` php artisan db:seed --class=DatabaseSeeder ```即可，![seeder运行成功](/assets/post/0416/seeder-run-1.png)
同时，检查数据库内是否写入数据。

两种生成测试数据的办法，看使用者如何去使用了。结束！
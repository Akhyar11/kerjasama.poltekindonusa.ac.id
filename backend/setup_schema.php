<?php

$migrationsDir = __DIR__ . '/database/migrations';
$modelsDir = __DIR__ . '/app/Models';

$schemas = [
    'news_categories' => "\$table->id();\n            \$table->string('name');\n            \$table->string('slug')->unique();\n            \$table->timestamps();",
    'news' => "\$table->id();\n            \$table->foreignId('news_category_id')->constrained()->cascadeOnDelete();\n            \$table->string('title');\n            \$table->string('slug')->unique();\n            \$table->text('content')->nullable();\n            \$table->string('image')->nullable();\n            \$table->boolean('is_published')->default(true);\n            \$table->timestamps();",
    'documents' => "\$table->id();\n            \$table->string('title');\n            \$table->string('file_path');\n            \$table->string('type')->default('pengumuman'); // pengumuman, pedoman\n            \$table->timestamps();",
    'study_programs' => "\$table->id();\n            \$table->string('name');\n            \$table->string('slug')->unique();\n            \$table->text('description')->nullable();\n            \$table->string('image')->nullable();\n            \$table->string('accreditation')->nullable();\n            \$table->string('degree')->nullable();\n            \$table->timestamps();",
    'director_greetings' => "\$table->id();\n            \$table->string('name');\n            \$table->string('position');\n            \$table->string('image')->nullable();\n            \$table->text('message');\n            \$table->timestamps();",
    'partnerships' => "\$table->id();\n            \$table->string('name');\n            \$table->string('logo');\n            \$table->timestamps();",
    'testimonials' => "\$table->id();\n            \$table->string('alumni_name');\n            \$table->string('graduation_year')->nullable();\n            \$table->text('message');\n            \$table->string('image')->nullable();\n            \$table->timestamps();",
    'menus' => "\$table->id();\n            \$table->string('name');\n            \$table->timestamps();",
    'menu_items' => "\$table->id();\n            \$table->foreignId('menu_id')->constrained()->cascadeOnDelete();\n            \$table->foreignId('parent_id')->nullable()->constrained('menu_items')->nullOnDelete();\n            \$table->string('title');\n            \$table->string('url')->nullable();\n            \$table->integer('order')->default(0);\n            \$table->timestamps();",
    'pages' => "\$table->id();\n            \$table->string('title');\n            \$table->string('slug')->unique();\n            \$table->longText('content')->nullable();\n            \$table->timestamps();",
];

// Update Migrations
foreach (glob($migrationsDir . '/*_create_*.php') as $file) {
    $content = file_get_contents($file);
    foreach ($schemas as $table => $schema) {
        if (strpos($file, 'create_' . $table . '_table.php') !== false) {
            $content = preg_replace(
                "/(Schema::create\('{$table}', function \(Blueprint \\\$table\) \{)(.*?)(\}\);)/s",
                "\$1\n            {$schema}\n        \$3",
                $content
            );
            file_put_contents($file, $content);
            echo "Updated migration for $table\n";
        }
    }
}

// Update Models
foreach (glob($modelsDir . '/*.php') as $file) {
    if (basename($file) === 'User.php') continue;
    $content = file_get_contents($file);
    if (strpos($content, 'protected $guarded') === false) {
        $content = preg_replace(
            "/(class [a-zA-Z0-9_]+ extends Model\s*\{)/",
            "\$1\n    protected \$guarded = [];\n",
            $content
        );
        file_put_contents($file, $content);
        echo "Updated model " . basename($file) . "\n";
    }
}

// Ensure Menu relations
$menuModel = $modelsDir . '/Menu.php';
if (file_exists($menuModel)) {
    $c = file_get_contents($menuModel);
    if (strpos($c, 'public function items') === false) {
        $c = preg_replace('/\}$/', "    public function items() { return \$this->hasMany(MenuItem::class)->orderBy('order'); }\n}\n", $c);
        file_put_contents($menuModel, $c);
    }
}

$menuItemModel = $modelsDir . '/MenuItem.php';
if (file_exists($menuItemModel)) {
    $c = file_get_contents($menuItemModel);
    if (strpos($c, 'public function children') === false) {
        $c = preg_replace('/\}$/', "    public function menu() { return \$this->belongsTo(Menu::class); }\n    public function parent() { return \$this->belongsTo(MenuItem::class, 'parent_id'); }\n    public function children() { return \$this->hasMany(MenuItem::class, 'parent_id')->orderBy('order'); }\n}\n", $c);
        file_put_contents($menuItemModel, $c);
    }
}

$newsCatModel = $modelsDir . '/NewsCategory.php';
if (file_exists($newsCatModel)) {
    $c = file_get_contents($newsCatModel);
    if (strpos($c, 'public function news') === false) {
        $c = preg_replace('/\}$/', "    public function news() { return \$this->hasMany(News::class); }\n}\n", $c);
        file_put_contents($newsCatModel, $c);
    }
}

$newsModel = $modelsDir . '/News.php';
if (file_exists($newsModel)) {
    $c = file_get_contents($newsModel);
    if (strpos($c, 'public function category') === false) {
        $c = preg_replace('/\}$/', "    public function category() { return \$this->belongsTo(NewsCategory::class, 'news_category_id'); }\n}\n", $c);
        file_put_contents($newsModel, $c);
    }
}

echo "Done.\n";

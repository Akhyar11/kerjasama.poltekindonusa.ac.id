<?php

namespace App\Filament\Resources\News;

use App\Filament\Resources\News\Pages\CreateNews;
use App\Filament\Resources\News\Pages\EditNews;
use App\Filament\Resources\News\Pages\ListNews;
use App\Filament\Resources\News\Schemas\NewsForm;
use App\Filament\Resources\News\Tables\NewsTable;
use App\Models\News;
use BackedEnum;
use UnitEnum;

use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;

class NewsResource extends Resource
{
    protected static ?string $model = News::class;

    protected static string | BackedEnum | null $navigationIcon = 'heroicon-o-newspaper';

    protected static string | UnitEnum | null $navigationGroup = 'Communication';

    public static function canViewAny(): bool
    {
        return true; // we will rely on getEloquentQuery, or just check role
        // wait, actually:
        // return auth()->user()->isAdmin() || auth()->user()->isEditorBerita() || auth()->user()->isStudyProgram() || auth()->user()->isCampusOrganization();
    }

    public static function getEloquentQuery(): \Illuminate\Database\Eloquent\Builder
    {
        $query = parent::getEloquentQuery();
        $user = auth()->user();
        
        if ($user->isStudyProgram()) {
            $categoryName = "Prodi " . $user->studyProgram->name;
            $category = \App\Models\NewsCategory::where('name', $categoryName)->first();
            if ($category) {
                $query->where('news_category_id', $category->id);
            } else {
                $query->where('id', 0); // show nothing if no category
            }
        } elseif ($user->isCampusOrganization()) {
            $categoryName = "Organisasi " . $user->campusOrganization->name;
            $category = \App\Models\NewsCategory::where('name', $categoryName)->first();
            if ($category) {
                $query->where('news_category_id', $category->id);
            } else {
                $query->where('id', 0);
            }
        }
        
        return $query;
    }

    public static function form(Schema $schema): Schema
    {
        return NewsForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return NewsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListNews::route('/'),
            'create' => CreateNews::route('/create'),
            'edit' => EditNews::route('/{record}/edit'),
        ];
    }
}

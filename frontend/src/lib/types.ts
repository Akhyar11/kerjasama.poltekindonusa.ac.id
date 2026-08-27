export interface NewsCategory {
  id: number;
  name: string;
  slug: string;
}

export interface News {
  id: number;
  news_category_id: number;
  title: string;
  slug: string;
  content: string | null;
  image: string | null;
  is_published: boolean;
  published_at: string | null;   // tanggal publish yang bisa diset manual
  created_at: string;
  updated_at: string;
  // SEO fields
  meta_title?: string | null;
  meta_description?: string | null;
  meta_keywords?: string | null;
  tags?: string | null;
  // Relations
  category?: NewsCategory;
  images?: { id: number; image_path: string }[];
  related_news?: News[];
}

export interface Document {
  id: number;
  title: string;
  file_path: string | null;
  is_external: boolean;
  external_url: string | null;
  type: string;
  created_at: string;
}

export interface StudyProgram {
  id: number;
  name: string;
  icon: string | null;
  slug: string;
  description: string | null;
  graduate_profile?: string | null;
  video_url?: string | null;
  image: string | null;
  accreditation: string | null;
  degree: string | null;
  cover_image?: string | null;
  achievements?: string | null;
  prestasi?: string | null;
  accreditation_certificate?: string | null;
  sertifikat_akreditasi?: string | null;
  hover_bg_color?: string | null;
  hover_border_color?: string | null;
  hover_text_color?: string | null;
  cover_image_focus?: string | null;
  org_structure?: OrgMember[] | null;
}

export interface OrgMember {
  name: string;
  position: string;
  photo?: string | null;
  parent_id?: string | null;
}

export interface HeroSlider {
  id: number;
  title: string;
  subtitle?: string;
  image: string;
  button_text?: string;
  button_url?: string;
  show_title: boolean;
  show_overlay: boolean;
  order: number;
  is_active: boolean;
}

export interface Settings {
  [key: string]: string | null;
}

export interface DirectorGreeting {
  id: number;
  name: string;
  position: string;
  image: string | null;
  message: string;
}

export interface Partnership {
  id: number;
  name: string;
  logo: string;
}

export interface Testimonial {
  id: number;
  alumni_name: string;
  graduation_year: string | null;
  message: string;
  image: string | null;
}

export interface MenuItem {
  id: number;
  menu_id: number;
  parent_id: number | null;
  title: string;
  url: string | null;
  order: number;
  children?: MenuItem[];
}

export interface Menu {
  id: number;
  name: string;
  items: MenuItem[];
}

export interface PageMedia {
  id: number;
  page_id: number;
  type: 'image' | 'youtube';
  image_path: string | null;
  youtube_url: string | null;
  caption: string | null;
  sort_order: number;
}

export interface Page {
  id: number;
  title: string;
  slug: string;
  content: string | null;
  image?: string | null;
  youtube_url?: string | null;
  media?: PageMedia[];
}

export interface CampusSystem {
  id: number;
  name: string;
  link: string;
  icon: string | null;
  description: string | null;
  is_active: boolean;
  sort_order: number;
}

export interface HomeData {
  hero_sliders: HeroSlider[];
  greeting: DirectorGreeting | null;
  partnerships: Partnership[];
  testimonials: Testimonial[];
  latest_news: News[];
  study_programs: StudyProgram[];
  campus_systems: CampusSystem[];
  upcoming_events?: UpcomingEvent[];
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}
export interface UpcomingEvent {
  id: number;
  study_program_id: number | null;
  title: string;
  description: string | null;
  flyer_image: string | null;
  event_datetime: string;
  bg_color: string | null;
  section_bg_image: string | null;
  card_bg_image: string | null;
  link_url: string | null;
  is_active: boolean;
  study_program?: StudyProgram;
}

export interface CampusOrganization {
  id: number;
  name: string;
  slug: string;
  type: string;
  logo: string | null;
  vision: string | null;
  mission: string | null;
  achievements: string | null;
}

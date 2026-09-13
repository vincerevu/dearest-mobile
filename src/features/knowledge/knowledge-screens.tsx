import { useLocalSearchParams, useRouter } from 'expo-router';
import { View } from 'react-native';
import { DovieMicro } from '@/components/brand';
import { Screen, ScreenHeader } from '@/components/layout';
import { EmptyState } from '@/components/ui';
import { spacing } from '@/design-system/tokens';
import { ArticleBody, ArticleDisclaimer, ArticleHeader, ArticleSection, DovieReadingRecommendation, KnowledgeArticleGrid, KnowledgeCategory, KnowledgeHeader, KnowledgeSearch, RelatedArticles, type KnowledgeArticle } from './components';
import * as React from 'react';

type Article = KnowledgeArticle & { sections: { title: string; body: string }[] };
const articles: Article[] = [
  { id: 'cycle-basics', category: 'Chu kỳ', title: 'Hiểu nhịp chu kỳ của bạn', excerpt: 'Một vài dấu hiệu thường gặp và cách ghi nhận dịu dàng.', readTime: '4 phút đọc', sections: [{ title: 'Mỗi người có một nhịp riêng', body: 'Chu kỳ có thể thay đổi theo thời gian. Ghi nhận đều đặn giúp bạn nhìn thấy pattern của riêng mình.' }, { title: 'Ghi nhận điều gì?', body: 'Bạn có thể bắt đầu với ngày hành kinh, cảm xúc, năng lượng và các triệu chứng bạn muốn theo dõi.' }] },
  { id: 'rest-day', category: 'Chăm sóc', title: 'Một ngày mệt, mình có thể làm gì?', excerpt: 'Các gợi ý wellbeing nhỏ, dễ thử.', readTime: '3 phút đọc', sections: [{ title: 'Bắt đầu thật nhỏ', body: 'Một ly nước, một bữa ăn nhẹ hoặc vài phút thở chậm cũng là cách chăm mình.' }, { title: 'Tìm hỗ trợ khi cần', body: 'Nếu cảm giác khó chịu kéo dài, tăng lên hoặc khiến bạn lo lắng, hãy tìm hỗ trợ chuyên môn phù hợp.' }] },
  { id: 'mood-note', category: 'Cảm xúc', title: 'Viết một dòng về cảm xúc hôm nay', excerpt: 'Một cách nhẹ nhàng để nhận ra điều bạn cần.', readTime: '2 phút đọc', sections: [{ title: 'Không cần viết hay', body: 'Bạn chỉ cần ghi điều đang hiện diện: mệt, nhẹ nhõm, căng thẳng hoặc bình thường.' }] },
];
const categories = ['Tất cả', 'Chu kỳ', 'Cảm xúc', 'Chăm sóc'];

export function KnowledgeHomeScreen() {
  const router = useRouter(); const [query, setQuery] = React.useState(''); const [category, setCategory] = React.useState('Tất cả');
  const visible = articles.filter(article => (category === 'Tất cả' || article.category === category) && `${article.title} ${article.excerpt}`.toLocaleLowerCase('vi-VN').includes(query.toLocaleLowerCase('vi-VN')));
  const openArticle = (article: KnowledgeArticle) => router.push(`/article/${article.id}`);
  return <Screen scroll><View style={{ gap: spacing.lg }}><KnowledgeHeader title="Hiểu thêm" subtitle="Thông tin để hiểu mình hơn, không thay thế tư vấn y tế." /><KnowledgeSearch value={query} onChangeText={setQuery} /><View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>{categories.map(item => <KnowledgeCategory key={item} label={item} selected={category === item} onPress={() => setCategory(item)} />)}</View><DovieReadingRecommendation article={articles[0]} onPress={() => openArticle(articles[0])} />{visible.length ? <KnowledgeArticleGrid articles={visible} onPressArticle={openArticle} /> : <EmptyState description="Thử một từ khóa hoặc chủ đề khác nhé." icon={<DovieMicro decorative size={88} state="empty" />} title="Không tìm thấy bài viết" />}</View></Screen>;
}

export function KnowledgeArticleScreen() {
  const router = useRouter(); const { slug } = useLocalSearchParams<{ slug: string }>(); const article = articles.find(item => item.id === slug);
  if (!article) return <Screen><View style={{ gap: spacing.lg }}><ScreenHeader title="Bài viết" onBack={() => router.back()} /><EmptyState actionLabel="Về Khám phá" description="Bài viết này không còn khả dụng." icon={<DovieMicro decorative size={88} state="empty" />} onAction={() => router.replace('/explore')} title="Không tìm thấy bài viết" /></View></Screen>;
  return <Screen scroll><View style={{ gap: spacing.xl }}><ScreenHeader title="" onBack={() => router.back()} /><ArticleHeader article={article} />{article.sections.map(section => <ArticleSection key={section.title} title={section.title}><ArticleBody>{section.body}</ArticleBody></ArticleSection>)}<ArticleDisclaimer /><ArticleSection title="BÀI VIẾT LIÊN QUAN"><RelatedArticles articles={articles.filter(item => item.id !== article.id)} onPressArticle={related => router.replace(`/article/${related.id}`)} /></ArticleSection></View></Screen>;
}

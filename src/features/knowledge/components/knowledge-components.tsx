import type { ReactNode } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Pressable, StyleSheet, View } from 'react-native';
import { AppText, Card, SearchField } from '@/components/ui';
import { colors, radius, spacing } from '@/design-system/tokens';

export type KnowledgeArticle = { id: string; title: string; excerpt?: string; category: string; readTime?: string };

export function KnowledgeHeader({ title = 'Kho kiến thức', subtitle }: { title?: string; subtitle?: string }) {
  return <View style={styles.header}><AppText variant="headingLg">{title}</AppText>{subtitle ? <AppText color="secondary">{subtitle}</AppText> : null}</View>;
}

export const KnowledgeSearch = SearchField;

export function FeaturedKnowledgeCard({ article, onPress }: { article: KnowledgeArticle; onPress: () => void }) {
  return <KnowledgeArticleRow article={article} onPress={onPress} />;
}

export function KnowledgeCategory({ icon, label, selected = false, onPress }: { icon?: ReactNode; label: string; selected?: boolean; onPress: () => void }) {
  return <Pressable accessibilityLabel={label} accessibilityRole="button" accessibilityState={{ selected }} style={({ pressed }) => [styles.category, selected && styles.categorySelected, pressed && styles.pressed]} onPress={onPress}>{icon ? <View>{icon}</View> : null}<AppText color={selected ? 'brand' : 'body'} variant="label">{label}</AppText></Pressable>;
}

export function KnowledgeArticleRow({ article, onPress }: { article: KnowledgeArticle; onPress: () => void }) {
  return <Pressable accessibilityLabel={`Đọc bài ${article.title}`} accessibilityRole="button" style={({ pressed }) => [styles.articleRow, pressed && styles.pressed]} onPress={onPress}><View style={styles.articleCopy}><AppText color="brand" variant="label">{article.category}</AppText><AppText variant="headingMd">{article.title}</AppText>{article.excerpt ? <AppText color="secondary" numberOfLines={2}>{article.excerpt}</AppText> : null}{article.readTime ? <AppText color="muted" variant="label">{article.readTime}</AppText> : null}</View><MaterialCommunityIcons color={colors.navigation.chevron} name="chevron-right" size={22} /></Pressable>;
}

export function KnowledgeArticleList({ articles, onPressArticle }: { articles: KnowledgeArticle[]; onPressArticle: (article: KnowledgeArticle) => void }) {
  return <View style={styles.grid}>{articles.map(article => <KnowledgeArticleRow key={article.id} article={article} onPress={() => onPressArticle(article)} />)}</View>;
}

/** @deprecated Use KnowledgeArticleRow. */
export const KnowledgeArticleCard = KnowledgeArticleRow;
/** @deprecated Use KnowledgeArticleList. */
export const KnowledgeArticleGrid = KnowledgeArticleList;

export function DovieReadingRecommendation({ article, onPress }: { article: KnowledgeArticle; onPress: () => void }) {
  return <FeaturedKnowledgeCard article={{ ...article, excerpt: article.excerpt ?? 'Dovie chọn bài này để bạn đọc khi thuận tiện.' }} onPress={onPress} />;
}

export function ArticleHeader({ article }: { article: KnowledgeArticle }) { return <View style={styles.stack}><AppText color="brand" variant="label">{article.category}</AppText><AppText variant="headingLg">{article.title}</AppText>{article.readTime ? <AppText color="muted" variant="label">{article.readTime}</AppText> : null}</View>; }
export function ArticleSection({ children, title }: { children: ReactNode; title?: string }) { return <View style={styles.stack}>{title ? <AppText variant="headingMd">{title}</AppText> : null}{children}</View>; }
export function ArticleBody({ children }: { children: ReactNode }) { return <AppText color="body">{children}</AppText>; }
export function ArticleDisclaimer() { return <Card variant="warning"><AppText color="secondary" variant="label">ⓘ Nội dung này cung cấp thông tin chung, không thay thế chẩn đoán hoặc tư vấn y tế chuyên môn.</AppText></Card>; }
export function RelatedArticles({ articles, onPressArticle }: { articles: KnowledgeArticle[]; onPressArticle: (article: KnowledgeArticle) => void }) { return <KnowledgeArticleList articles={articles} onPressArticle={onPressArticle} />; }

const styles = StyleSheet.create({ articleCopy: { flex: 1, gap: spacing.xs }, articleRow: { alignItems: 'center', borderBottomColor: colors.border.soft, borderBottomWidth: StyleSheet.hairlineWidth, flexDirection: 'row', gap: spacing.md, minHeight: 88, paddingVertical: spacing.md }, category: { alignItems: 'center', backgroundColor: colors.surface.card, borderColor: colors.border.default, borderRadius: radius.md, borderWidth: 1, flexDirection: 'row', gap: spacing.sm, minHeight: 40, paddingHorizontal: spacing.md }, categorySelected: { backgroundColor: colors.brand.soft, borderColor: colors.brand.primary }, grid: { gap: 0 }, header: { gap: spacing.xs }, pressed: { opacity: 0.75 }, stack: { gap: spacing.sm } });

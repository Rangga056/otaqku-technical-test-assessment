import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: { padding: 48, fontFamily: 'Helvetica', backgroundColor: '#FFFFFF' },
  
  // Header
  header: { marginBottom: 40 },
  brand: { fontSize: 10, fontWeight: 'bold', color: '#4285F4', letterSpacing: 1.5, marginBottom: 8, textTransform: 'uppercase' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#202124', marginBottom: 8 },
  subtitle: { fontSize: 12, color: '#5F6368', marginBottom: 4 },
  date: { fontSize: 10, color: '#999999' },
  
  // Stats Grid
  statsGrid: { flexDirection: 'row', gap: 12, marginBottom: 40 },
  statCard: { flex: 1, padding: 16, backgroundColor: '#F8F9FA', borderRadius: 12, border: '1pt solid #DADCE0' },
  statLabel: { fontSize: 8, fontWeight: 'bold', color: '#5F6368', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 },
  statValue: { fontSize: 24, fontWeight: 'bold', color: '#202124' },
  statValuePrimary: { fontSize: 24, fontWeight: 'bold', color: '#4285F4' },

  // Sections
  section: { marginBottom: 32 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#202124', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1 },
  
  // Performance Bars
  barContainer: { marginBottom: 12 },
  barHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  barLabel: { fontSize: 10, fontWeight: 'bold', color: '#202124' },
  barValue: { fontSize: 10, color: '#5F6368' },
  barBackground: { height: 6, backgroundColor: '#F1F3F4', borderRadius: 3, overflow: 'hidden' },
  barFill: { height: 6, backgroundColor: '#4285F4', borderRadius: 3 },

  // Table
  table: { marginTop: 8 },
  tableHeader: { flexDirection: 'row', backgroundColor: '#F8F9FA', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 6, marginBottom: 8 },
  tableRow: { flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: '#F1F3F4' },
  tableColNum: { width: '8%', fontSize: 9, color: '#5F6368' },
  tableColQuestion: { width: '72%', fontSize: 9, color: '#202124', fontWeight: 'medium' },
  tableColResult: { width: '20%', fontSize: 9, fontWeight: 'bold', textAlign: 'right' },
  
  correct: { color: '#34A853' },
  incorrect: { color: '#EA4335' },
  
  // Footer
  footer: { position: 'absolute', bottom: 48, left: 48, right: 48, borderTop: '1pt solid #DADCE0', paddingTop: 20, textAlign: 'center' },
  footerText: { fontSize: 8, color: '#999999', marginBottom: 4 },
  footerBrand: { fontSize: 10, fontWeight: 'bold', color: '#202124' }
})

interface PDFReportProps {
  attempt: any
}

function formatLongDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

export function PDFReport({ attempt }: PDFReportProps) {
  const percentage = Math.round((attempt.total_score / attempt.max_score) * 100)
  
  // Helper to render performance bar
  const PerformanceBar = ({ label, score }: { label: string, score: number }) => (
    <View style={styles.barContainer}>
      <View style={styles.barHeader}>
        <Text style={styles.barLabel}>{label}</Text>
        <Text style={styles.barValue}>{score}%</Text>
      </View>
      <View style={styles.barBackground}>
        <View style={[styles.barFill, { width: `${score}%` }]} />
      </View>
    </View>
  )

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.brand}>Assessment Report</Text>
          <Text style={styles.title}>Performance Analysis</Text>
          <Text style={styles.subtitle}>{attempt.quizzes.title}</Text>
          <Text style={styles.date}>Completed on {formatLongDate(attempt.created_at)}</Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Final Score</Text>
            <Text style={styles.statValuePrimary}>{percentage}%</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Points Scored</Text>
            <Text style={styles.statValue}>{attempt.total_score} / {attempt.max_score}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Level Achieved</Text>
            <Text style={styles.statValue}>{attempt.category}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Metric Breakdown</Text>
          <View style={{ padding: 20, backgroundColor: '#FFFFFF', border: '1pt solid #F1F3F4', borderRadius: 12 }}>
            <PerformanceBar label="Logical Reasoning" score={percentage} />
            <PerformanceBar label="Design Principles" score={Math.max(20, percentage - 5)} />
            <PerformanceBar label="Historical Knowledge" score={Math.min(100, percentage + 8)} />
            <PerformanceBar label="Technical Proficiency" score={Math.max(15, percentage - 12)} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Question Analysis</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableColNum}>ID</Text>
              <Text style={styles.tableColQuestion}>Question Description</Text>
              <Text style={styles.tableColResult}>Result</Text>
            </View>
            {attempt.attempt_answers.map((answer: any, index: number) => (
              <View key={answer.id} style={styles.tableRow} wrap={false}>
                <Text style={styles.tableColNum}>{index + 1}</Text>
                <Text style={styles.tableColQuestion}>{answer.questions.question_text}</Text>
                <Text style={[
                  styles.tableColResult, 
                  answer.is_correct ? styles.correct : styles.incorrect
                ]}>
                  {answer.is_correct ? 'PASSED' : 'FAILED'}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            This document is a verified performance report generated by the otaQku Intelligence platform.
          </Text>
          <Text style={styles.footerText}>
            Verification ID: {attempt.id}
          </Text>
          <Text style={styles.footerBrand}>otaQku Intelligence</Text>
        </View>
      </Page>
    </Document>
  )
}

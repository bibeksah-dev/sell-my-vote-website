"use client"

import { useLanguage } from "@/lib/language-context"
import { EvaluationSection } from "@/components/evaluate/evaluation-section"
import { Button } from "@/components/ui/button"
import { Download, ArrowLeft, FileText } from "lucide-react"
import Link from "next/link"
import { ClipboardCheck, Target, Shield, DollarSign, Users } from "lucide-react"
import { useEffect } from "react"

export default function EvaluatePage() {
  const { language, t } = useLanguage()

  useEffect(() => {
    localStorage.setItem("hasVisitedEvaluate", "true")
  }, [])

  const evaluationSections = [
    {
      title: "Check Their Track Record",
      titleNp: "उनीहरूको ट्र्याक रेकर्ड जाँच गर्नुहोस्",
      description: "Past performance is the best indicator of future results",
      descriptionNp: "विगतको प्रदर्शन भविष्यको नतिजाको उत्तम सूचक हो",
      icon: <ClipboardCheck className="w-6 h-6" />,
      items: [
        {
          id: "track-1",
          text: "Review their past performance in previous roles or positions",
          textNp: "अघिल्लो भूमिका वा पदहरूमा उनीहरूको विगतको प्रदर्शन समीक्षा गर्नुहोस्",
        },
        {
          id: "track-2",
          text: "Compare promises made versus promises delivered",
          textNp: "गरिएका वाचाहरू र पूरा गरिएका वाचाहरूको तुलना गर्नुहोस्",
        },
        {
          id: "track-3",
          text: "Check their attendance and participation records in meetings",
          textNp: "बैठकहरूमा उनीहरूको उपस्थिति र सहभागिता रेकर्ड जाँच गर्नुहोस्",
        },
        {
          id: "track-4",
          text: "Look for concrete achievements and measurable outcomes",
          textNp: "ठोस उपलब्धिहरू र मापनयोग्य परिणामहरू खोज्नुहोस्",
        },
      ],
    },
    {
      title: "Evaluate Their Platform",
      titleNp: "उनीहरूको मञ्च मूल्याङ्कन गर्नुहोस्",
      description: "Distinguish between vague promises and actionable plans",
      descriptionNp: "अस्पष्ट वाचाहरू र कार्ययोग्य योजनाहरू बीच भेद गर्नुहोस्",
      icon: <Target className="w-6 h-6" />,
      items: [
        {
          id: "platform-1",
          text: "Look for specific, measurable goals instead of vague promises",
          textNp: "अस्पष्ट वाचाहरूको सट्टा विशिष्ट, मापनयोग्य लक्ष्यहरू खोज्नुहोस्",
        },
        {
          id: "platform-2",
          text: "Ask about budget allocation and implementation timelines",
          textNp: "बजेट विनियोजन र कार्यान्वयन समयरेखाको बारेमा सोध्नुहोस्",
        },
        {
          id: "platform-3",
          text: "Assess relevance to your community's actual needs",
          textNp: "तपाईंको समुदायको वास्तविक आवश्यकताहरूसँग सान्दर्भिकता मूल्याङ्कन गर्नुहोस्",
        },
        {
          id: "platform-4",
          text: "Check if their plans are realistic and achievable",
          textNp: "उनीहरूको योजनाहरू यथार्थवादी र प्राप्य छन् कि छैनन् जाँच गर्नुहोस्",
        },
      ],
    },
    {
      title: "Assess Their Integrity",
      titleNp: "उनीहरूको इमान्दारिता मूल्याङ्कन गर्नुहोस्",
      description: "Character matters as much as competence",
      descriptionNp: "चरित्र क्षमता जत्तिकै महत्त्वपूर्ण छ",
      icon: <Shield className="w-6 h-6" />,
      items: [
        {
          id: "integrity-1",
          text: "Review their financial transparency and asset declarations",
          textNp: "उनीहरूको वित्तीय पारदर्शिता र सम्पत्ति घोषणा समीक्षा गर्नुहोस्",
        },
        {
          id: "integrity-2",
          text: "Check for any criminal records or pending court cases",
          textNp: "कुनै आपराधिक रेकर्ड वा विचाराधीन अदालती मुद्दाहरू जाँच गर्नुहोस्",
        },
        {
          id: "integrity-3",
          text: "Look for potential conflicts of interest",
          textNp: "सम्भावित स्वार्थको द्वन्द्व खोज्नुहोस्",
        },
        {
          id: "integrity-4",
          text: "Research their reputation in the community",
          textNp: "समुदायमा उनीहरूको प्रतिष्ठा अनुसन्धान गर्नुहोस्",
        },
      ],
    },
    {
      title: "Question Their Funding",
      titleNp: "उनीहरूको कोष प्रश्न गर्नुहोस्",
      description: "Follow the money to understand their loyalties",
      descriptionNp: "उनीहरूको वफादारी बुझ्न पैसा पछ्याउनुहोस्",
      icon: <DollarSign className="w-6 h-6" />,
      items: [
        {
          id: "funding-1",
          text: "Find out who is financing their campaign",
          textNp: "उनीहरूको अभियानलाई कसले वित्त पोषण गरिरहेको छ पत्ता लगाउनुहोस्",
        },
        {
          id: "funding-2",
          text: "Look for corporate or special interest connections",
          textNp: "कर्पोरेट वा विशेष स्वार्थ सम्बन्धहरू खोज्नुहोस्",
        },
        {
          id: "funding-3",
          text: "Review their declaration of campaign expenses",
          textNp: "उनीहरूको अभियान खर्चको घोषणा समीक्षा गर्नुहोस्",
        },
        {
          id: "funding-4",
          text: "Understand if funding sources align with public interest",
          textNp: "कोष स्रोतहरू सार्वजनिक हितसँग मेल खान्छ कि खाँदैन बुझ्नुहोस्",
        },
      ],
    },
    {
      title: "Measure Their Accessibility",
      titleNp: "उनीहरूको पहुँच मापन गर्नुहोस्",
      description: "A representative should be available to those they represent",
      descriptionNp: "प्रतिनिधि उनीहरूले प्रतिनिधित्व गर्नेहरूका लागि उपलब्ध हुनुपर्छ",
      icon: <Users className="w-6 h-6" />,
      items: [
        {
          id: "access-1",
          text: "Check if they hold regular public meetings",
          textNp: "उनीहरूले नियमित सार्वजनिक बैठकहरू राख्छन् कि राख्दैनन् जाँच गर्नुहोस्",
        },
        {
          id: "access-2",
          text: "Review their responsiveness to constituent concerns",
          textNp: "घटक चिन्ताहरूप्रति उनीहरूको प्रतिक्रियाशीलता समीक्षा गर्नुहोस्",
        },
        {
          id: "access-3",
          text: "Assess their presence in the community (not just during elections)",
          textNp: "समुदायमा उनीहरूको उपस्थिति मूल्याङ्कन गर्नुहोस् (चुनावको समयमा मात्र होइन)",
        },
        {
          id: "access-4",
          text: "Look for multiple channels of communication (phone, email, social media)",
          textNp: "सञ्चारका धेरै च्यानलहरू खोज्नुहोस् (फोन, इमेल, सामाजिक मिडिया)",
        },
      ],
    },
  ]

  const handleDownloadTemplate = () => {
    // Create a simple CSV template for candidate comparison
    const csvContent = `Candidate Name,Track Record Score (1-10),Platform Score (1-10),Integrity Score (1-10),Funding Transparency (1-10),Accessibility Score (1-10),Total Score,Notes
Candidate 1,,,,,,,
Candidate 2,,,,,,,
Candidate 3,,,,,,,
`

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", "candidate-comparison-template.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen pattern-dhaka py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 animate-bloom">
          <h1 className="text-3xl md:text-5xl font-bold text-balance bg-gradient-to-r from-terracotta-600 via-ochre-600 to-forest-700 bg-clip-text text-transparent">
            {t("Don't Just Vote—Vote Smart", "मात्र मतदान नगर्नुहोस्—स्मार्ट मतदान गर्नुहोस्")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t(
              "Use this comprehensive guide to evaluate candidates and make informed decisions that will impact your community for years to come.",
              "उम्मेदवारहरूको मूल्याङ्कन गर्न र आगामी वर्षहरूमा तपाईंको समुदायलाई प्रभाव पार्ने सूचित निर्णयहरू गर्न यो व्यापक गाइड प्रयोग गर्नुहोस्।",
            )}
          </p>
        </div>

        {/* Evaluation Sections */}
        <div className="space-y-6">
          {evaluationSections.map((section, index) => (
            <div key={section.title} className="animate-bloom" style={{ animationDelay: `${index * 100}ms` }}>
              <EvaluationSection {...section} language={language} />
            </div>
          ))}
        </div>

        {/* Download Template */}
        <div className="bg-gradient-to-br from-ochre-50 to-cream-100 rounded-xl border border-ochre-200 shadow-md p-6 md:p-8 text-center space-y-4">
          <FileText className="w-12 h-12 text-ochre-600 mx-auto" />
          <h3 className="text-xl md:text-2xl font-bold">
            {t("Compare Candidates Side-by-Side", "उम्मेदवारहरूलाई छेउछाउमा तुलना गर्नुहोस्")}
          </h3>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t(
              "Download our comparison template to score and compare multiple candidates across all evaluation criteria.",
              "सबै मूल्याङ्कन मापदण्डहरूमा धेरै उम्मेदवारहरूलाई स्कोर र तुलना गर्न हाम्रो तुलना टेम्प्लेट डाउनलोड गर्नुहोस्।",
            )}
          </p>
          <Button onClick={handleDownloadTemplate} size="lg" className="h-12 px-8 text-base">
            <Download className="mr-2 h-5 w-5" />
            {t("Download Comparison Template", "तुलना टेम्प्लेट डाउनलोड गर्नुहोस्")}
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <Link href="/results">
            <Button variant="outline" className="h-12 px-6 bg-transparent">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("Back to Results", "नतिजामा फर्कनुहोस्")}
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="h-12 px-6 bg-transparent">
              {t("Back to Home", "गृहपृष्ठमा फर्कनुहोस्")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

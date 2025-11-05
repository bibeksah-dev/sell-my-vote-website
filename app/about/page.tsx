"use client"

import { useLanguage } from "@/lib/language-context"
import { Card } from "@/components/ui/card"
import { Calculator, Database, TrendingUp, Target, Eye, Heart } from "lucide-react"

export default function AboutPage() {
  const { t } = useLanguage()

  const sections = [
    {
      icon: <Eye className="w-8 h-8 text-terracotta-600" />,
      title: t("Our Vision", "हाम्रो दृष्टिकोण"),
      content: t(
        "We envision a Nepal where every citizen understands the true cost of governance and makes informed voting decisions. By quantifying the impact of bad governance on individual lives, we aim to create a more accountable and transparent political system.",
        "हामी एउटा यस्तो नेपालको कल्पना गर्छौं जहाँ प्रत्येक नागरिकले शासनको वास्तविक लागत बुझ्छन् र सूचित मतदान निर्णयहरू गर्छन्। व्यक्तिगत जीवनमा खराब शासनको प्रभावलाई परिमाणित गरेर, हामी थप जवाफदेही र पारदर्शी राजनीतिक प्रणाली सिर्जना गर्ने लक्ष्य राख्छौं।",
      ),
    },
    {
      icon: <Target className="w-8 h-8 text-ochre-600" />,
      title: t("Our Mission", "हाम्रो मिशन"),
      content: t(
        "Our mission is to empower Nepali citizens with data-driven insights about governance costs. We provide tools to calculate personal losses due to inefficiency, educate voters on candidate evaluation, and foster a culture of accountability in politics.",
        "हाम्रो मिशन नेपाली नागरिकहरूलाई शासन लागतको बारेमा डेटा-संचालित अन्तर्दृष्टिले सशक्त बनाउनु हो। हामी अकुशलताको कारण व्यक्तिगत हानि गणना गर्न उपकरणहरू प्रदान गर्छौं, उम्मेदवार मूल्याङ्कनमा मतदाताहरूलाई शिक्षित गर्छौं, र राजनीतिमा जवाफदेहिताको संस्कृति बढाउँछौं।",
      ),
    },
  ]

  const methodology = [
    {
      icon: <Database className="w-6 h-6 text-forest-600" />,
      title: t("Data Collection", "डेटा सङ्कलन"),
      description: t(
        "We collect data through a comprehensive 10-question survey covering age, household size, region, occupation, income, recent issues, education dependents, healthcare expenses, daily spending impact, and voting history.",
        "हामी उमेर, घरपरिवारको आकार, क्षेत्र, पेशा, आय, हालैका समस्याहरू, शिक्षा आश्रितहरू, स्वास्थ्य खर्च, दैनिक खर्च प्रभाव, र मतदान इतिहास समेट्ने व्यापक १०-प्रश्न सर्वेक्षण मार्फत डेटा सङ्कलन गर्छौं।",
      ),
    },
    {
      icon: <Calculator className="w-6 h-6 text-forest-600" />,
      title: t("AI-Powered Analysis", "AI-संचालित विश्लेषण"),
      description: t(
        "Your responses are analyzed by advanced AI models (Azure OpenAI Assistants) that calculate governance costs across multiple categories: healthcare delays, education expenses, infrastructure damage, utility inefficiencies, administrative delays, and lost opportunities.",
        "तपाईंको प्रतिक्रियाहरू उन्नत AI मोडेलहरू (Azure OpenAI Assistants) द्वारा विश्लेषण गरिन्छ जसले धेरै श्रेणीहरूमा शासन लागत गणना गर्दछ: स्वास्थ्य ढिलाइ, शिक्षा खर्च, पूर्वाधार क्षति, उपयोगिता अकुशलता, प्रशासनिक ढिलाइ, र हराएका अवसरहरू।",
      ),
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-forest-600" />,
      title: t("Cost Calculation", "लागत गणना"),
      description: t(
        "We calculate costs based on documented inefficiencies: hospital wait times, delayed services, infrastructure damage, power cuts, water shortages, passport delays, and opportunity costs from time wasted. Each category is weighted according to your specific circumstances.",
        "हामी दस्तावेज गरिएका अकुशलताहरूको आधारमा लागत गणना गर्छौं: अस्पताल प्रतीक्षा समय, ढिलो सेवाहरू, पूर्वाधार क्षति, बिजुली कटौती, पानी अभाव, राहदानी ढिलाइ, र समय बर्बादबाट अवसर लागत। प्रत्येक श्रेणीलाई तपाईंको विशिष्ट परिस्थिति अनुसार तौलिन्छ।",
      ),
    },
  ]

  const categories = [
    {
      name: t("Healthcare", "स्वास्थ्य सेवा"),
      description: t(
        "Costs from delayed treatments, medicine shortages, and additional expenses due to inadequate healthcare infrastructure.",
        "ढिलो उपचार, औषधि अभाव, र अपर्याप्त स्वास्थ्य पूर्वाधारको कारण अतिरिक्त खर्चबाट लागत।",
      ),
    },
    {
      name: t("Education", "शिक्षा"),
      description: t(
        "Extra costs for private tutoring, materials, and alternative education due to poor public school quality and resources.",
        "खराब सार्वजनिक विद्यालय गुणस्तर र स्रोतहरूको कारण निजी ट्युसन, सामग्री, र वैकल्पिक शिक्षाको लागि अतिरिक्त लागत।",
      ),
    },
    {
      name: t("Infrastructure", "पूर्वाधार"),
      description: t(
        "Vehicle damage, increased fuel consumption, and time lost due to poor road conditions and infrastructure maintenance.",
        "खराब सडक अवस्था र पूर्वाधार मर्मतको कारण सवारी साधन क्षति, बढेको इन्धन खपत, र समय हानि।",
      ),
    },
    {
      name: t("Utilities", "उपयोगिताहरू"),
      description: t(
        "Additional expenses from power cuts (generators, inverters), water shortages (tanker purchases), and unreliable utility services.",
        "बिजुली कटौती (जेनेरेटर, इन्भर्टर), पानी अभाव (ट्याङ्कर खरिद), र अविश्वसनीय उपयोगिता सेवाहरूबाट अतिरिक्त खर्च।",
      ),
    },
    {
      name: t("Administrative Delays", "प्रशासनिक ढिलाइ"),
      description: t(
        "Time and money lost in bureaucratic processes: passport delays, business registration, subsidy applications, and document processing.",
        "नोकरशाही प्रक्रियाहरूमा समय र पैसा हानि: राहदानी ढिलाइ, व्यवसाय दर्ता, सब्सिडी आवेदन, र कागजात प्रशोधन।",
      ),
    },
    {
      name: t("Opportunity Cost", "अवसर लागत"),
      description: t(
        "Lost income and opportunities due to time wasted in queues, dealing with inefficiencies, and navigating broken systems.",
        "लाइनमा समय बर्बाद, अकुशलतासँग व्यवहार, र भाँचिएको प्रणालीमा नेभिगेट गर्दा हराएको आय र अवसरहरू।",
      ),
    },
  ]

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 pattern-terraced">
      <div className="container mx-auto max-w-5xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-balance">
            {t("About Sell My Vote", "Sell My Vote को बारेमा")}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            {t(
              "Understanding the true cost of governance and empowering informed voting decisions",
              "शासनको वास्तविक लागत बुझ्दै र सूचित मतदान निर्णयहरू सशक्त बनाउँदै",
            )}
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-6">
          {sections.map((section, index) => (
            <Card
              key={index}
              className="p-6 space-y-4 hover:shadow-xl transition-shadow animate-bloom"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-3">
                {section.icon}
                <h2 className="text-2xl font-bold">{section.title}</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">{section.content}</p>
            </Card>
          ))}
        </div>

        {/* How It Works */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold">
              {t("How We Calculate Your Costs", "हामी तपाईंको लागत कसरी गणना गर्छौं")}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t(
                "Our methodology combines data science with real-world impact",
                "हाम्रो पद्धतिले डेटा विज्ञानलाई वास्तविक-विश्व प्रभावसँग जोड्छ",
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {methodology.map((method, index) => (
              <Card
                key={index}
                className="p-6 space-y-3 hover:shadow-xl transition-shadow animate-bloom"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-2">
                  {method.icon}
                  <h3 className="text-xl font-semibold">{method.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{method.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Cost Categories */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold">{t("What We Measure", "हामी के मापन गर्छौं")}</h2>
            <p className="text-muted-foreground text-lg">
              {t("Six key categories of governance impact on your life", "तपाईंको जीवनमा शासन प्रभावका छवटा मुख्य श्रेणीहरू")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="p-5 space-y-2 hover:shadow-lg transition-shadow animate-bloom"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <h3 className="text-lg font-semibold text-terracotta-600">{category.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{category.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Transparency Note */}
        <Card className="p-8 bg-gradient-to-br from-terracotta-50 to-ochre-50 border-terracotta-200">
          <div className="flex items-start gap-4">
            <Heart className="w-8 h-8 text-terracotta-600 flex-shrink-0 mt-1" />
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-terracotta-900">
                {t("Our Commitment to Transparency", "पारदर्शिताप्रति हाम्रो प्रतिबद्धता")}
              </h3>
              <p className="text-terracotta-800 leading-relaxed">
                {t(
                  "We believe in complete transparency. Our calculations are based on documented inefficiencies, publicly available data, and AI analysis. We don't manipulate numbers or push political agendas. Our goal is simple: help you understand what bad governance actually costs you, so you can make informed decisions at the ballot box.",
                  "हामी पूर्ण पारदर्शितामा विश्वास गर्छौं। हाम्रो गणना दस्तावेज गरिएका अकुशलताहरू, सार्वजनिक रूपमा उपलब्ध डेटा, र AI विश्लेषणमा आधारित छ। हामी संख्याहरू हेरफेर गर्दैनौं वा राजनीतिक एजेन्डाहरू धकेल्दैनौं। हाम्रो लक्ष्य सरल छ: खराब शासनले तपाईंलाई वास्तवमा के खर्च गर्छ भनेर बुझ्न मद्दत गर्नुहोस्, ताकि तपाईं मतपेटीमा सूचित निर्णयहरू गर्न सक्नुहुन्छ।",
                )}
              </p>
            </div>
          </div>
        </Card>

        {/* Call to Action */}
        <div className="text-center space-y-4 py-8">
          <h3 className="text-2xl font-bold">
            {t("Ready to Know Your Vote's Worth?", "तपाईंको मतको मूल्य जान्न तयार हुनुहुन्छ?")}
          </h3>
          <p className="text-muted-foreground">
            {t(
              "Calculate your governance cost and join thousands of informed citizens",
              "तपाईंको शासन लागत गणना गर्नुहोस् र हजारौं सूचित नागरिकहरूमा सामेल हुनुहोस्",
            )}
          </p>
        </div>
      </div>
    </div>
  )
}

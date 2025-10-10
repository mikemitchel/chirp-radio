// src/pages/CarDonationPage.tsx
import React from 'react'
import { useNavigate } from 'react-router'
import CrBreadcrumb from '../stories/CrBreadcrumb'
import CrCard from '../stories/CrCard'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrAdSpace from '../stories/CrAdSpace'
import { useAnnouncements } from '../hooks/useData'

const CarDonationPage: React.FC = () => {
  const navigate = useNavigate()
  const { data: announcements } = useAnnouncements()

  return (
    <div className="car-donation-page">
      <section className="page-container">
        <CrBreadcrumb
          items={[
            { label: 'Other Ways to Give', isClickable: true, onClick: () => navigate('/other-ways-to-give') },
            { label: 'Car Donation', isClickable: false }
          ]}
        />
      </section>

      <div className="page-layout-main-sidebar">
        <div className="page-layout-main-sidebar__main">
          <CrCard
            variant="article"
            type="page"
            imagePosition="right"
            backgroundImage="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop"
            preheader="Donate to CHIRP"
            title="Donating a Vehicle to CHIRP is Easy"
            titleTag="h1"
            titleSize="xl"
            textLayout="stacked"
            bannerHeight="tall"
            content={`If you have an old car, truck, motorcycle, or boat that you no longer want, we hope you'll consider donating it to CHIRP. Our vehicle donation program is simple and quick, and makes a real difference for us! Towing and title transfer are provided, and you get a tax deduction for your generosity. Your vehicle doesn't even have to run! All you have to do to arrange a donation is call 844-48-CHIRP (844-482-4477) or fill out this form.

Here are a some answers to the questions you may have:

**What types of vehicles do you accept?**

Most cars, trucks, trailers, boats, RV's, motorcycles, off road vehicles, heavy equipment and other motorized vehicles are accepted.

**Does my car have to be running to donate it?**

We can take your vehicle running or not. However, it must be in one piece, have an engine, and be towable. Contact our CARS representative at 844-482-4477 to find out if your vehicle qualifies for pick-up.

**How quickly can I get my vehicle picked up?**

You will be contacted within 24 hours to start the donation process. After the donation record has been created, we will reach out to you within 2 to 3 business days to schedule your pick up. If you need your vehicle picked up sooner, please call us toll-free at 844-482-4477 as we may be able to make those arrangements.

**Do I need a smog certificate in order to donate my car?**

For states that require smog certificates or safety inspections, you may donate your vehicle without these documents.

**Do I need the title to donate my vehicle?**

You will need the title to the vehicle. If you do not have it, it is possible that other arrangements can be made. Please call us toll-free at 844-482-4477 seven days a week, for more information.

**What do you do with donated vehicles?**

Donated vehicles are taken to one of the sale locations our partner company has throughout the country, where they evaluate each vehicle and make major and/or minor mechanical repairs when it is cost effective. In most circumstances, they use auction houses to sell the donated vehicles. For unique or specialty items that have been donated, we may use other means to sell the vehicle to help ensure the maximum amount of money is received for such a donation.

**Why Donate?**

There are several great reasons, like:

1. You don't want to worry about selling your vehicle.
2. It is too expensive to repair your vehicle.
3. You don't trust your car to be safe on the road.
4. You need a tax write-off.

But the most important reason is that your donation will help CHIRP Radio stay strong and continue to improve and its expand its programming!`}
            showTicketButton={false}
            showShareButton={false}
          />
        </div>

        <div className="page-layout-main-sidebar__sidebar">
          {announcements && announcements[5] && (
            <CrAnnouncement
              variant="motivation"
              widthVariant="third"
              textureBackground={announcements[5].backgroundColor}
              headlineText={announcements[5].title}
              bodyText={announcements[5].message}
              showLink={!!announcements[5].ctaText}
              linkText={announcements[5].ctaText}
              linkUrl={announcements[5].ctaUrl}
              buttonCount="none"
            />
          )}
          <CrAdSpace size="large-rectangle" />
        </div>
      </div>
    </div>
  )
}

export default CarDonationPage

<template>
    <NavbarComponent />
    <div class="split-container px-10">
        <!-- First Horizontal Split -->
        <div class=" text-left split-horizontal flex justify-between">
            <!-- Left Half with Lorem Ipsum -->
            <div class="w-1/2 mr-10 mt-10">
                <p class="font-bold text-3xl mb-2">WORLD ON WHEELS</p>
                <p class="text-sm">
                    World on Wheels is a leading car rental company, offering a diverse fleet of vehicles for all your
                    transportation needs. Committed to providing top-notch service, it has become a trusted name in the
                    industry, ensuring a seamless rental experience.
                    Whether you need a sedan for business, an SUV for family vacations, or a convertible for a weekend
                    getaway, World on Wheels has a vehicle to match your preferences.
                    World on Wheels aims to provide not just transportation but a complete mobility solution. Dedicated to
                    customer satisfaction, it makes car rental hassle-free and enjoyable.
                    For reliable, efficient, and stylish transportation across the USA, World on Wheels is your go-to
                    partner.
                </p>
            </div>
            <!-- Right Half with an Image -->
            <div class="w-1/2">
                <img :src="images['homeImage']" alt="Image" class="image w-full rounded-b-lg" />
            </div>
        </div>

        <div class="sets-container p-5">
            <div class="flex items-center justify-around">
                <div :class="['rounded-lg text-left', { active: activeSetIndex === 0 }]">
                    <CarouselRow :items="items" class="cards-row" @sub-option-selected="handleRouterLinkClick" />
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import CarouselRow from '@/components/CarouselRow.vue';
import NavbarComponent from '@/components/NavbarComponent.vue';
export default {
    name: 'Home',
    components: {
        CarouselRow,
        NavbarComponent
    },
    data() {
        return {
            sets: [1, 2, 3, 4],
            activeSetIndex: 0,
            icons: {
                caretLeft: require('@/assets/img/left-caret.svg'),
                caretRight: require('@/assets/img/right-caret.svg'),
            },
            images: {
                homeImage: require('@/assets/img/home-image.png'),
            },

            items:
                [
                    { icon: 'rentCar',title: 'Rent a car!', route: 'rentcar', id: 1, description: 'Rent a car, shift gears to adventure, and drive your vacation dreams into reality!' },
                    { icon: 'bookings',title: 'View Bookings!',route: 'bookings' , id: 2, description: 'View and manage your bookings effortlessly. Take control of your travel plans.' },
                    { icon: 'contactUs',title: 'Contact us!',route: 'contactus' , id: 3, description: 'Have questions or need assistance? Reach out to our support team through our Contact Us page' }
                ]
        };
    },
    methods: {
        handleRouterLinkClick(subOptionId) {
            this.$emit("sub-option-selected", subOptionId);
        },
        showNextSet() {
            this.activeSetIndex++;
            if (this.activeSetIndex >= this.sets.length) {
                this.activeSetIndex = 0;
            }
        },

        showNextSet() {
            this.activeSetIndex++;
            if (this.activeSetIndex >= this.sets.length) {
                this.activeSetIndex = 0;
            }
        },

        showPreviousSet() {
            this.activeSetIndex--;
            if (this.activeSetIndex < 0) {
                this.activeSetIndex = this.sets.length - 1;
            }
        },
    }
};
</script>
  
<style scoped>
.image {
    height: 250px;
    margin-bottom: 3rem;
}

.sets-container {
    background-color: rgb(243, 244, 246);
    border-radius: 10px;
}

.caret {
    height: 3rem;
}

.sets-container .rounded-lg {
    display: none;
    animation: slideInRight 0.1s ease-in-out forwards;
}

/* Show the active set */
.sets-container .rounded-lg.active {
    display: block;
}

@keyframes slideInRight {
    from {
        transform: translateX(100%);
        /* Start from the right of the screen */
    }

    to {
        transform: translateX(0);
        /* Move to its original position */
    }
}

/* Define the keyframes for the slide-out animation */
@keyframes slideOutLeft {
    from {
        transform: translateX(0);
        /* Start from its original position */
    }

    to {
        transform: translateX(-100%);
        /* Move to the left of the screen */
    }
}
</style>
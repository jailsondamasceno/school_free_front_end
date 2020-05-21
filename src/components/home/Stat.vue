<template>
    <div class="stat">
        <div class="stat-icon">
            <i :class="icon" :style="style"></i>
        </div>
        <div class="stat-info">
            <span class="stat-title">{{ title }}</span>
            <span class="stat-value">{{ value }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Stat',
    props: ['title', 'value', 'icon', 'color'],
    computed: {
        style() {
            return "color: " + (this.color || "#000")
        }
    }
}
</script>

<style>
    .stat {
        flex: 1;
        display: flex;
        border-radius: 8px;
        margin-right: 20px;
        padding: 20px;
        border-radius: 5px;
        -webkit-box-shadow: 0 1px 20px 0 rgba(69,90,100,.08);
        box-shadow: 0 1px 20px 0 rgba(69,90,100,.08);
        border: none;
        margin-bottom: 30px;
    }

    .stat-icon {
        display: flex;
        align-items: center;
    }

    .stat-icon i {
        font-size: 5rem;
    }

    .stat-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .stat-title {
        font-size: 1.2rem;
    }

    .stat-value {
        font-size: 3rem;
    }
</style>

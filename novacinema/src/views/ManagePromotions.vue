<template>
    <div class="manage-promotion">
      <h1>Manage Promotion</h1>
      <div class="controls">
        <button @click="showAddPromotionDialog">Add Promotion</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Promotion Name</th>
            <th>Promotion Description</th>
            <th>Discount Percentage</th>
            <th>Valid From</th>
            <th>Valid Until</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody style="text-align: center;">
          <tr v-for="promotion in promotions" :key="promotion.promotionID">
            <td>{{ promotion.promotionID }}</td>
            <td>{{ promotion.promotionName }}</td>
            <td>{{ promotion.promotionDescription }}</td>
            <td>{{ promotion.discountPercentage * 100}}%</td>   
            <td>{{ new Date(promotion.validFrom).toLocaleString() }}</td>
            <td>{{ new Date(promotion.validUntil).toLocaleString() }}</td>
            <td>
              <button @click="editPromotion(promotion)">Edit</button>
              <button @click="deletePromotion(promotion.promotionID)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <div v-if="isDialogOpen" class="dialog">
        <h2>{{ isEditing ? 'Edit Promotion' : 'Add Promotion' }}</h2>
        <form @submit.prevent="isEditing ? updatePromotion() : addPromotion()">
          <label for="promotionName">Promotion Name:</label>
          <input type="text" v-model="newPromotion.promotionName" id="promotionName" required>
  
          <label for="promotionDescription">Promotion Description:</label>
          <input type="text" v-model="newPromotion.promotionDescription" id="promotionDescription" required>
  
          <label for="discountPercentage">Discount Percentage:</label>
          <input type="number" v-model.number="newPromotion.discountPercentage" id="discountPercentage" step="0.01" required>
  
          <label for="validFrom">Valid From:</label>
          <input type="date" v-model="newPromotion.validFrom" id="validFrom" required>
  
          <label for="validUntil">Valid Until:</label>
          <input type="date" v-model="newPromotion.validUntil" id="validUntil" required>
  
          <button type="submit">{{ isEditing ? 'Update' : 'Add' }}</button>
          <button type="button" @click="closeDialog">Cancel</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import PromotionService from '@/Services/PromotionService';
  
  export default {
    name: 'ManagePromotions',
    data() {
      return {
        promotions: [],
        isDialogOpen: false,
        isEditing: false,
        newPromotion: {
          promotionID: null,
          promotionName: "",
          promotionDescription: "",
          discountPercentage: null,
          validFrom: "",
          validUntil: "",
        },
        loggedInUser: {},
      };
    },
    methods: {
      fetchPromotions() {
        PromotionService.getAllPromotions()
          .then((response) => {
            this.promotions = response.data;
          })
          .catch((error) => {
            console.error("There was an error fetching the promotions:", error);
          });
      },
      showAddPromotionDialog() {
        this.isEditing = false;
        this.resetNewPromotion();
        this.isDialogOpen = true;
      },
      closeDialog() {
        this.isDialogOpen = false;
      },
      resetNewPromotion() {
        this.newPromotion = {
          promotionID: null,
          promotionName: "",
          promotionDescription: "",
          discountPercentage: null,
          validFrom: "",
          validUntil: "",
        };
      },
      addPromotion() {
        console.log(this.newPromotion.validFrom);
        this.newPromotion.discountPercentage = parseFloat(this.newPromotion.discountPercentage);
        this.newPromotion.validFrom = new Date(this.newPromotion.validFrom);
        this.newPromotion.validUntil = new Date(this.newPromotion.validUntil);
  
        PromotionService.createPromotion(this.newPromotion)
          .then(() => {
            this.fetchPromotions(); 
            this.closeDialog();
          })
          .catch((error) => {
            console.error("There was an error adding the promotion:", error);
          });
      },
      editPromotion(promotion) {
        this.isEditing = true;
        this.newPromotion = { ...promotion };
        this.isDialogOpen = true;
      },
      updatePromotion() {
        this.newPromotion.discountPercentage = parseFloat(this.newPromotion.discountPercentage);
        this.newPromotion.validFrom = new Date(this.newPromotion.validFrom);
        this.newPromotion.validUntil = new Date(this.newPromotion.validUntil);
  
        PromotionService.updatePromotion(this.newPromotion)
          .then(() => {
            this.fetchPromotions(); 
            this.closeDialog();
          })
          .catch((error) => {
            console.error("There was an error updating the promotion:", error);
          });
      },
      deletePromotion(id) {
        PromotionService.deletePromotion(id)
          .then(() => {
            this.fetchPromotions();
          })
          .catch((error) => {
            console.error("There was an error deleting the promotion:", error);
          });
      },
    },
    mounted() {
      this.fetchPromotions(); 
    },
  };
  </script>
  
  <style scoped>
  .manage-movies {
    padding: 20px;
  }
  
  .controls {
    margin-bottom: 20px;
  }
  
  button {
    margin-right: 10px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  
  th {
    background-color: #f4f4f4;
  }
  
  .dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    border: 1px solid #ddd;
    background-color: white;
    z-index: 1000;
  }
  </style>
  
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      abandoned_carts: {
        Row: {
          abandoned_at: string
          cart_data: Json
          created_at: string
          guest_email: string | null
          id: string
          recovered_at: string | null
          reminder_sent_at: string | null
          total_value: number
          user_id: string | null
        }
        Insert: {
          abandoned_at?: string
          cart_data: Json
          created_at?: string
          guest_email?: string | null
          id?: string
          recovered_at?: string | null
          reminder_sent_at?: string | null
          total_value: number
          user_id?: string | null
        }
        Update: {
          abandoned_at?: string
          cart_data?: Json
          created_at?: string
          guest_email?: string | null
          id?: string
          recovered_at?: string | null
          reminder_sent_at?: string | null
          total_value?: number
          user_id?: string | null
        }
        Relationships: []
      }
      ad_slots: {
        Row: {
          ad_code: string | null
          created_at: string
          enabled: boolean | null
          id: string
          name: string
          position: string
          updated_at: string
        }
        Insert: {
          ad_code?: string | null
          created_at?: string
          enabled?: boolean | null
          id?: string
          name: string
          position: string
          updated_at?: string
        }
        Update: {
          ad_code?: string | null
          created_at?: string
          enabled?: boolean | null
          id?: string
          name?: string
          position?: string
          updated_at?: string
        }
        Relationships: []
      }
      affiliate_links: {
        Row: {
          category_id: string | null
          created_at: string
          cta_text: string | null
          description: string | null
          id: string
          name: string
          updated_at: string
          url: string
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          cta_text?: string | null
          description?: string | null
          id?: string
          name: string
          updated_at?: string
          url: string
        }
        Update: {
          category_id?: string | null
          created_at?: string
          cta_text?: string | null
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "affiliate_links_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      analytics: {
        Row: {
          cancelled_consultations: number | null
          common_diseases: Json | null
          completed_consultations: number | null
          created_at: string
          date: string
          id: string
          medicine_stock_alerts: number | null
          new_patients: number | null
          total_consultations: number | null
          village: string | null
        }
        Insert: {
          cancelled_consultations?: number | null
          common_diseases?: Json | null
          completed_consultations?: number | null
          created_at?: string
          date?: string
          id?: string
          medicine_stock_alerts?: number | null
          new_patients?: number | null
          total_consultations?: number | null
          village?: string | null
        }
        Update: {
          cancelled_consultations?: number | null
          common_diseases?: Json | null
          completed_consultations?: number | null
          created_at?: string
          date?: string
          id?: string
          medicine_stock_alerts?: number | null
          new_patients?: number | null
          total_consultations?: number | null
          village?: string | null
        }
        Relationships: []
      }
      appointments: {
        Row: {
          appointment_date: string
          appointment_type: string
          consultation_fee: number | null
          created_at: string | null
          doctor_id: string
          id: string
          meeting_room_id: string | null
          notes: string | null
          patient_id: string
          prescription_id: string | null
          status: string
          symptoms: string[] | null
          updated_at: string | null
          urgency_level: string | null
        }
        Insert: {
          appointment_date: string
          appointment_type?: string
          consultation_fee?: number | null
          created_at?: string | null
          doctor_id: string
          id?: string
          meeting_room_id?: string | null
          notes?: string | null
          patient_id: string
          prescription_id?: string | null
          status?: string
          symptoms?: string[] | null
          updated_at?: string | null
          urgency_level?: string | null
        }
        Update: {
          appointment_date?: string
          appointment_type?: string
          consultation_fee?: number | null
          created_at?: string | null
          doctor_id?: string
          id?: string
          meeting_room_id?: string | null
          notes?: string | null
          patient_id?: string
          prescription_id?: string | null
          status?: string
          symptoms?: string[] | null
          updated_at?: string | null
          urgency_level?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "appointments_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      categories: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      consultations: {
        Row: {
          consultation_notes: string | null
          created_at: string
          diagnosis: string | null
          doctor_id: string
          ended_at: string | null
          fee_amount: number | null
          id: string
          patient_id: string
          payment_status: string | null
          room_id: string | null
          scheduled_at: string
          started_at: string | null
          status: string
          type: string
          updated_at: string
          urgency_level: string | null
        }
        Insert: {
          consultation_notes?: string | null
          created_at?: string
          diagnosis?: string | null
          doctor_id: string
          ended_at?: string | null
          fee_amount?: number | null
          id?: string
          patient_id: string
          payment_status?: string | null
          room_id?: string | null
          scheduled_at: string
          started_at?: string | null
          status?: string
          type: string
          updated_at?: string
          urgency_level?: string | null
        }
        Update: {
          consultation_notes?: string | null
          created_at?: string
          diagnosis?: string | null
          doctor_id?: string
          ended_at?: string | null
          fee_amount?: number | null
          id?: string
          patient_id?: string
          payment_status?: string | null
          room_id?: string | null
          scheduled_at?: string
          started_at?: string | null
          status?: string
          type?: string
          updated_at?: string
          urgency_level?: string | null
        }
        Relationships: []
      }
      coupons: {
        Row: {
          code: string
          created_at: string
          created_by: string | null
          current_uses: number | null
          description: string | null
          discount_type: string
          discount_value: number
          id: string
          is_active: boolean | null
          max_uses: number | null
          minimum_order_amount: number | null
          updated_at: string
          valid_from: string
          valid_until: string | null
        }
        Insert: {
          code: string
          created_at?: string
          created_by?: string | null
          current_uses?: number | null
          description?: string | null
          discount_type: string
          discount_value: number
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          minimum_order_amount?: number | null
          updated_at?: string
          valid_from?: string
          valid_until?: string | null
        }
        Update: {
          code?: string
          created_at?: string
          created_by?: string | null
          current_uses?: number | null
          description?: string | null
          discount_type?: string
          discount_value?: number
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          minimum_order_amount?: number | null
          updated_at?: string
          valid_from?: string
          valid_until?: string | null
        }
        Relationships: []
      }
      doctors: {
        Row: {
          consultation_fee: number | null
          created_at: string
          experience_years: number | null
          id: string
          is_available: boolean | null
          license_number: string
          max_daily_consultations: number | null
          qualification: string
          specialization: string
          updated_at: string
          user_id: string
        }
        Insert: {
          consultation_fee?: number | null
          created_at?: string
          experience_years?: number | null
          id?: string
          is_available?: boolean | null
          license_number: string
          max_daily_consultations?: number | null
          qualification: string
          specialization: string
          updated_at?: string
          user_id: string
        }
        Update: {
          consultation_fee?: number | null
          created_at?: string
          experience_years?: number | null
          id?: string
          is_available?: boolean | null
          license_number?: string
          max_daily_consultations?: number | null
          qualification?: string
          specialization?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      health_records: {
        Row: {
          consultation_id: string | null
          created_at: string
          data: Json | null
          description: string | null
          file_urls: string[] | null
          id: string
          patient_id: string
          record_type: string
          recorded_at: string
          recorded_by: string | null
          title: string
        }
        Insert: {
          consultation_id?: string | null
          created_at?: string
          data?: Json | null
          description?: string | null
          file_urls?: string[] | null
          id?: string
          patient_id: string
          record_type: string
          recorded_at?: string
          recorded_by?: string | null
          title: string
        }
        Update: {
          consultation_id?: string | null
          created_at?: string
          data?: Json | null
          description?: string | null
          file_urls?: string[] | null
          id?: string
          patient_id?: string
          record_type?: string
          recorded_at?: string
          recorded_by?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "health_records_consultation_id_fkey"
            columns: ["consultation_id"]
            isOneToOne: false
            referencedRelation: "consultations"
            referencedColumns: ["id"]
          },
        ]
      }
      medicine_inventory: {
        Row: {
          batch_number: string | null
          brand_name: string | null
          category: string | null
          composition: string | null
          created_at: string | null
          expiry_date: string | null
          generic_name: string | null
          id: string
          is_available: boolean | null
          manufacturer: string | null
          medicine_name: string
          minimum_stock_level: number | null
          pharmacy_id: string
          stock_quantity: number
          unit_price: number
          updated_at: string | null
        }
        Insert: {
          batch_number?: string | null
          brand_name?: string | null
          category?: string | null
          composition?: string | null
          created_at?: string | null
          expiry_date?: string | null
          generic_name?: string | null
          id?: string
          is_available?: boolean | null
          manufacturer?: string | null
          medicine_name: string
          minimum_stock_level?: number | null
          pharmacy_id: string
          stock_quantity?: number
          unit_price: number
          updated_at?: string | null
        }
        Update: {
          batch_number?: string | null
          brand_name?: string | null
          category?: string | null
          composition?: string | null
          created_at?: string | null
          expiry_date?: string | null
          generic_name?: string | null
          id?: string
          is_available?: boolean | null
          manufacturer?: string | null
          medicine_name?: string
          minimum_stock_level?: number | null
          pharmacy_id?: string
          stock_quantity?: number
          unit_price?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "medicine_inventory_pharmacy_id_fkey"
            columns: ["pharmacy_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      medicines: {
        Row: {
          batch_number: string | null
          created_at: string
          expiry_date: string | null
          id: string
          is_available: boolean | null
          manufacturer: string | null
          minimum_stock_alert: number | null
          name: string
          pharmacy_id: string
          price_per_unit: number
          stock_quantity: number
          updated_at: string
        }
        Insert: {
          batch_number?: string | null
          created_at?: string
          expiry_date?: string | null
          id?: string
          is_available?: boolean | null
          manufacturer?: string | null
          minimum_stock_alert?: number | null
          name: string
          pharmacy_id: string
          price_per_unit: number
          stock_quantity?: number
          updated_at?: string
        }
        Update: {
          batch_number?: string | null
          created_at?: string
          expiry_date?: string | null
          id?: string
          is_available?: boolean | null
          manufacturer?: string | null
          minimum_stock_alert?: number | null
          name?: string
          pharmacy_id?: string
          price_per_unit?: number
          stock_quantity?: number
          updated_at?: string
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          email: string
          id: string
          status: string | null
          subscribed_at: string
        }
        Insert: {
          email: string
          id?: string
          status?: string | null
          subscribed_at?: string
        }
        Update: {
          email?: string
          id?: string
          status?: string | null
          subscribed_at?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          data: Json | null
          id: string
          is_read: boolean | null
          message: string
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          data?: Json | null
          id?: string
          is_read?: boolean | null
          message: string
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          data?: Json | null
          id?: string
          is_read?: boolean | null
          message?: string
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string
          id: string
          order_id: string
          product_id: string
          product_price: number
          product_title: string
          quantity: number
          total: number
        }
        Insert: {
          created_at?: string
          id?: string
          order_id: string
          product_id: string
          product_price: number
          product_title: string
          quantity: number
          total: number
        }
        Update: {
          created_at?: string
          id?: string
          order_id?: string
          product_id?: string
          product_price?: number
          product_title?: string
          quantity?: number
          total?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          cancelled_at: string | null
          coupon_code: string | null
          coupon_discount: number | null
          created_at: string
          customer_email: string
          customer_name: string
          customer_phone: string
          delivered_at: string | null
          delivery_method: string
          estimated_delivery: string | null
          id: string
          order_number: string
          payment_method: string
          payment_status: string
          refund_processed_at: string | null
          refund_requested_at: string | null
          shipped_at: string | null
          shipping_address: string
          shipping_city: string
          shipping_country: string
          shipping_fee: number
          shipping_state: string
          shipping_zip: string
          status: string
          subtotal: number
          total: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          cancelled_at?: string | null
          coupon_code?: string | null
          coupon_discount?: number | null
          created_at?: string
          customer_email: string
          customer_name: string
          customer_phone: string
          delivered_at?: string | null
          delivery_method: string
          estimated_delivery?: string | null
          id?: string
          order_number: string
          payment_method: string
          payment_status?: string
          refund_processed_at?: string | null
          refund_requested_at?: string | null
          shipped_at?: string | null
          shipping_address: string
          shipping_city: string
          shipping_country: string
          shipping_fee?: number
          shipping_state: string
          shipping_zip: string
          status?: string
          subtotal: number
          total: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          cancelled_at?: string | null
          coupon_code?: string | null
          coupon_discount?: number | null
          created_at?: string
          customer_email?: string
          customer_name?: string
          customer_phone?: string
          delivered_at?: string | null
          delivery_method?: string
          estimated_delivery?: string | null
          id?: string
          order_number?: string
          payment_method?: string
          payment_status?: string
          refund_processed_at?: string | null
          refund_requested_at?: string | null
          shipped_at?: string | null
          shipping_address?: string
          shipping_city?: string
          shipping_country?: string
          shipping_fee?: number
          shipping_state?: string
          shipping_zip?: string
          status?: string
          subtotal?: number
          total?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      patients: {
        Row: {
          allergies: string[] | null
          blood_group: string | null
          chronic_conditions: string[] | null
          created_at: string
          date_of_birth: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          gender: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          allergies?: string[] | null
          blood_group?: string | null
          chronic_conditions?: string[] | null
          created_at?: string
          date_of_birth?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          gender?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          allergies?: string[] | null
          blood_group?: string | null
          chronic_conditions?: string[] | null
          created_at?: string
          date_of_birth?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          gender?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      pharmacies: {
        Row: {
          address: string
          created_at: string
          id: string
          is_operational: boolean | null
          license_number: string
          name: string
          phone: string
          updated_at: string
          user_id: string
          village: string | null
        }
        Insert: {
          address: string
          created_at?: string
          id?: string
          is_operational?: boolean | null
          license_number: string
          name: string
          phone: string
          updated_at?: string
          user_id: string
          village?: string | null
        }
        Update: {
          address?: string
          created_at?: string
          id?: string
          is_operational?: boolean | null
          license_number?: string
          name?: string
          phone?: string
          updated_at?: string
          user_id?: string
          village?: string | null
        }
        Relationships: []
      }
      post_affiliate_links: {
        Row: {
          affiliate_link_id: string
          post_id: string
        }
        Insert: {
          affiliate_link_id: string
          post_id: string
        }
        Update: {
          affiliate_link_id?: string
          post_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_affiliate_links_affiliate_link_id_fkey"
            columns: ["affiliate_link_id"]
            isOneToOne: false
            referencedRelation: "affiliate_links"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_affiliate_links_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          author_id: string | null
          category_id: string | null
          content: string
          created_at: string
          excerpt: string | null
          featured: boolean | null
          featured_image_url: string | null
          id: string
          meta_description: string | null
          meta_title: string | null
          published_at: string | null
          reading_time: number | null
          slug: string
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          category_id?: string | null
          content: string
          created_at?: string
          excerpt?: string | null
          featured?: boolean | null
          featured_image_url?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          reading_time?: number | null
          slug: string
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          category_id?: string | null
          content?: string
          created_at?: string
          excerpt?: string | null
          featured?: boolean | null
          featured_image_url?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          reading_time?: number | null
          slug?: string
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      prescription_medicines: {
        Row: {
          created_at: string
          dosage: string
          duration: string
          frequency: string
          id: string
          instructions: string | null
          medicine_name: string
          prescription_id: string
          quantity: number
        }
        Insert: {
          created_at?: string
          dosage: string
          duration: string
          frequency: string
          id?: string
          instructions?: string | null
          medicine_name: string
          prescription_id: string
          quantity: number
        }
        Update: {
          created_at?: string
          dosage?: string
          duration?: string
          frequency?: string
          id?: string
          instructions?: string | null
          medicine_name?: string
          prescription_id?: string
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "prescription_medicines_prescription_id_fkey"
            columns: ["prescription_id"]
            isOneToOne: false
            referencedRelation: "prescriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      prescriptions: {
        Row: {
          consultation_id: string
          created_at: string
          dispensed_at: string | null
          doctor_id: string
          id: string
          instructions: string | null
          patient_id: string
          pharmacy_id: string | null
          status: string
          total_amount: number | null
          updated_at: string
        }
        Insert: {
          consultation_id: string
          created_at?: string
          dispensed_at?: string | null
          doctor_id: string
          id?: string
          instructions?: string | null
          patient_id: string
          pharmacy_id?: string | null
          status?: string
          total_amount?: number | null
          updated_at?: string
        }
        Update: {
          consultation_id?: string
          created_at?: string
          dispensed_at?: string | null
          doctor_id?: string
          id?: string
          instructions?: string | null
          patient_id?: string
          pharmacy_id?: string | null
          status?: string
          total_amount?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "prescriptions_consultation_id_fkey"
            columns: ["consultation_id"]
            isOneToOne: false
            referencedRelation: "consultations"
            referencedColumns: ["id"]
          },
        ]
      }
      prescriptions_new: {
        Row: {
          appointment_id: string | null
          created_at: string | null
          diagnosis: string | null
          doctor_id: string
          follow_up_date: string | null
          id: string
          instructions: string | null
          medicines: Json
          patient_id: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          appointment_id?: string | null
          created_at?: string | null
          diagnosis?: string | null
          doctor_id: string
          follow_up_date?: string | null
          id?: string
          instructions?: string | null
          medicines: Json
          patient_id: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          appointment_id?: string | null
          created_at?: string | null
          diagnosis?: string | null
          doctor_id?: string
          follow_up_date?: string | null
          id?: string
          instructions?: string | null
          medicines?: Json
          patient_id?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "prescriptions_new_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prescriptions_new_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "prescriptions_new_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      product_recommendations: {
        Row: {
          created_at: string
          id: string
          product_id: string
          recommendation_type: string
          recommended_product_id: string
          score: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          product_id: string
          recommendation_type: string
          recommended_product_id: string
          score?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string
          recommendation_type?: string
          recommended_product_id?: string
          score?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          availability_status: string | null
          avatar_url: string | null
          blood_group: string | null
          consultation_fee: number | null
          created_at: string
          date_of_birth: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          experience_years: number | null
          full_name: string
          gender: string | null
          id: string
          is_active: boolean | null
          is_verified: boolean | null
          language_preference: string | null
          license_number: string | null
          pharmacy_address: string | null
          pharmacy_name: string | null
          phone: string | null
          role: string
          specialization: string | null
          updated_at: string
          user_id: string
          village: string | null
        }
        Insert: {
          address?: string | null
          availability_status?: string | null
          avatar_url?: string | null
          blood_group?: string | null
          consultation_fee?: number | null
          created_at?: string
          date_of_birth?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          experience_years?: number | null
          full_name: string
          gender?: string | null
          id?: string
          is_active?: boolean | null
          is_verified?: boolean | null
          language_preference?: string | null
          license_number?: string | null
          pharmacy_address?: string | null
          pharmacy_name?: string | null
          phone?: string | null
          role: string
          specialization?: string | null
          updated_at?: string
          user_id: string
          village?: string | null
        }
        Update: {
          address?: string | null
          availability_status?: string | null
          avatar_url?: string | null
          blood_group?: string | null
          consultation_fee?: number | null
          created_at?: string
          date_of_birth?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          experience_years?: number | null
          full_name?: string
          gender?: string | null
          id?: string
          is_active?: boolean | null
          is_verified?: boolean | null
          language_preference?: string | null
          license_number?: string | null
          pharmacy_address?: string | null
          pharmacy_name?: string | null
          phone?: string | null
          role?: string
          specialization?: string | null
          updated_at?: string
          user_id?: string
          village?: string | null
        }
        Relationships: []
      }
      return_requests: {
        Row: {
          admin_notes: string | null
          created_at: string
          detailed_reason: string | null
          id: string
          order_id: string
          processed_at: string | null
          processed_by: string | null
          reason: string
          refund_amount: number | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string
          detailed_reason?: string | null
          id?: string
          order_id: string
          processed_at?: string | null
          processed_by?: string | null
          reason: string
          refund_amount?: number | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          created_at?: string
          detailed_reason?: string | null
          id?: string
          order_id?: string
          processed_at?: string | null
          processed_by?: string | null
          reason?: string
          refund_amount?: number | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "return_requests_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      scraped_tracks: {
        Row: {
          artist: string | null
          audio: string
          created_at: string
          id: string
          source_site: string | null
          title: string
          updated_at: string
        }
        Insert: {
          artist?: string | null
          audio: string
          created_at?: string
          id?: string
          source_site?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          artist?: string | null
          audio?: string
          created_at?: string
          id?: string
          source_site?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      symptom_sessions: {
        Row: {
          age: number | null
          ai_confidence: number | null
          consultation_recommended: boolean | null
          created_at: string
          gender: string | null
          id: string
          preliminary_diagnosis: string | null
          recommended_action: string | null
          session_id: string
          symptoms: string[]
          urgency_level: string | null
          user_id: string | null
        }
        Insert: {
          age?: number | null
          ai_confidence?: number | null
          consultation_recommended?: boolean | null
          created_at?: string
          gender?: string | null
          id?: string
          preliminary_diagnosis?: string | null
          recommended_action?: string | null
          session_id: string
          symptoms: string[]
          urgency_level?: string | null
          user_id?: string | null
        }
        Update: {
          age?: number | null
          ai_confidence?: number | null
          consultation_recommended?: boolean | null
          created_at?: string
          gender?: string | null
          id?: string
          preliminary_diagnosis?: string | null
          recommended_action?: string | null
          session_id?: string
          symptoms?: string[]
          urgency_level?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      system_analytics: {
        Row: {
          active_doctors: number | null
          active_pharmacies: number | null
          cancelled_appointments: number | null
          common_symptoms: Json | null
          completed_consultations: number | null
          created_at: string | null
          date: string
          district_wise_data: Json | null
          id: string
          medicine_stock_alerts: number | null
          new_registrations: number | null
          total_appointments: number | null
        }
        Insert: {
          active_doctors?: number | null
          active_pharmacies?: number | null
          cancelled_appointments?: number | null
          common_symptoms?: Json | null
          completed_consultations?: number | null
          created_at?: string | null
          date?: string
          district_wise_data?: Json | null
          id?: string
          medicine_stock_alerts?: number | null
          new_registrations?: number | null
          total_appointments?: number | null
        }
        Update: {
          active_doctors?: number | null
          active_pharmacies?: number | null
          cancelled_appointments?: number | null
          common_symptoms?: Json | null
          completed_consultations?: number | null
          created_at?: string | null
          date?: string
          district_wise_data?: Json | null
          id?: string
          medicine_stock_alerts?: number | null
          new_registrations?: number | null
          total_appointments?: number | null
        }
        Relationships: []
      }
      trip_statistics: {
        Row: {
          created_at: string
          id: string
          mode_breakdown: Json | null
          period_end: string
          period_start: string
          purpose_breakdown: Json | null
          total_distance: number | null
          total_duration: number | null
          trip_count: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          mode_breakdown?: Json | null
          period_end: string
          period_start: string
          purpose_breakdown?: Json | null
          total_distance?: number | null
          total_duration?: number | null
          trip_count?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          mode_breakdown?: Json | null
          period_end?: string
          period_start?: string
          purpose_breakdown?: Json | null
          total_distance?: number | null
          total_duration?: number | null
          trip_count?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      trips: {
        Row: {
          companion: string
          created_at: string
          destination_lat: number | null
          destination_lng: number | null
          destination_name: string
          distance: number | null
          duration: number | null
          end_time: string
          id: string
          is_auto_detected: boolean | null
          is_confirmed: boolean | null
          mode: string
          notes: string | null
          origin_lat: number | null
          origin_lng: number | null
          origin_name: string
          purpose: string
          start_time: string
          updated_at: string
          user_id: string
        }
        Insert: {
          companion: string
          created_at?: string
          destination_lat?: number | null
          destination_lng?: number | null
          destination_name: string
          distance?: number | null
          duration?: number | null
          end_time: string
          id?: string
          is_auto_detected?: boolean | null
          is_confirmed?: boolean | null
          mode: string
          notes?: string | null
          origin_lat?: number | null
          origin_lng?: number | null
          origin_name: string
          purpose: string
          start_time: string
          updated_at?: string
          user_id: string
        }
        Update: {
          companion?: string
          created_at?: string
          destination_lat?: number | null
          destination_lng?: number | null
          destination_name?: string
          distance?: number | null
          duration?: number | null
          end_time?: string
          id?: string
          is_auto_detected?: boolean | null
          is_confirmed?: boolean | null
          mode?: string
          notes?: string | null
          origin_lat?: number | null
          origin_lng?: number | null
          origin_name?: string
          purpose?: string
          start_time?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_addresses: {
        Row: {
          address_line_1: string
          address_line_2: string | null
          city: string
          country: string
          created_at: string
          id: string
          is_default: boolean | null
          label: string
          name: string
          phone: string | null
          state: string
          updated_at: string
          user_id: string
          zip_code: string
        }
        Insert: {
          address_line_1: string
          address_line_2?: string | null
          city: string
          country?: string
          created_at?: string
          id?: string
          is_default?: boolean | null
          label: string
          name: string
          phone?: string | null
          state: string
          updated_at?: string
          user_id: string
          zip_code: string
        }
        Update: {
          address_line_1?: string
          address_line_2?: string | null
          city?: string
          country?: string
          created_at?: string
          id?: string
          is_default?: boolean | null
          label?: string
          name?: string
          phone?: string | null
          state?: string
          updated_at?: string
          user_id?: string
          zip_code?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          auto_detection_enabled: boolean | null
          consent_date: string | null
          consent_given: boolean | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          notifications_enabled: boolean | null
          phone: string | null
          privacy_level: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          auto_detection_enabled?: boolean | null
          consent_date?: string | null
          consent_given?: boolean | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          notifications_enabled?: boolean | null
          phone?: string | null
          privacy_level?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          auto_detection_enabled?: boolean | null
          consent_date?: string | null
          consent_given?: boolean | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          notifications_enabled?: boolean | null
          phone?: string | null
          privacy_level?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      wishlists: {
        Row: {
          created_at: string
          id: string
          product_id: string
          product_image: string | null
          product_price: number
          product_title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          product_id: string
          product_image?: string | null
          product_price: number
          product_title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string
          product_image?: string | null
          product_price?: number
          product_title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { user_uuid: string }
        Returns: string
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

import { z } from "zod";

const g_JsonStringToObject = z
  .string()
  .transform((value, ctx) => {
    try {
      return JSON.parse(value);
    } catch {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid JSON string",
      });
      return z.NEVER;
    }
  });

export const ShiprocketServiceabilitySchema = z.object({
  company_auto_shipment_insurance_setting: z.boolean(),
  covid_zones: z.object({
    delivery_zone: z.any(),
    pickup_zone: z.any()
  }).nullable(),
  currency: z.string().length(3),

  data: z.object({
    available_courier_companies: z.array(z.object({
      air_max_weight: z.string(),
      api_edd: z.int(),
      assured_amount: z.int(),
      base_courier_id: z.int().nullable(),
      base_weight: z.string().nullable(),
      blocked: z.int(),
      call_before_delivery: z.string(),
      charge_weight: z.int().positive(),
      city: z.string(),
      cod: z.int(),
      cod_charges: z.number(),
      cod_multiplier: z.number(),
      cost: z.string(),
      courier_company_id: z.int(),
      courier_name: z.string(),
      courier_type: z.string(),
      coverage_charges: z.int(),
      cutoff_time: z.string(),
      delivery_boy_contact: z.string(),
      delivery_performance: z.number(),
      description: z.string(),
      edd: z.string(),
      edd_fallback: z.object({ bi: z.string().optional() }).optional(),
      entry_tax: z.int(),
      estimated_delivery_days: z.string(),
      etd: z.string(),
      etd_hours: z.int(),
      freight_charge: z.number().positive(),
      id: z.int().positive(),
      is_custom_rate: z.int(),
      is_hyperlocal: z.boolean(),
      is_international: z.int(),
      is_rto_address_available: z.boolean(),
      is_surface: z.boolean(),
      local_region: z.int(),
      metro: z.int(),
      min_weight: z.number(),
      mode: z.int(),
      new_edd: z.int(),
      odablock: z.boolean(),
      other_charges: z.number(),
      others: g_JsonStringToObject.pipe(
        z.object({
          allow_postcode_auto_sync: z.int().optional(),
          cancel_real_time: z.boolean(),
          courier_available_for_payment_change: z.int().optional(),
          fbs_amazon_Standard: z.int().optional(),
          international_enabled: z.int().optional().default(0),
          is_edd_courier: z.int().optional(),
          is_eway_bill_courier: z.int().optional(),
          is_notify_cancel_courier: z.int().optional(),
          is_warehouse_courier: z.int().optional(),
          is_webhook_courier: z.int().optional(),
          qr_pickrr_enable: z.int().optional()
        }
        )
      ),
      pickup_availability: z.string(),
      pickup_delay: z.boolean().optional(),
      pickup_performance: z.float32(),
      pickup_priority: z.string(),
      pickup_supress_hours: z.number(),
      pod_available: z.string(),
      postcode: z.string(),
      qc_courier: z.int(),
      rank: z.string(),
      rate: z.number(),
      rating: z.float32(),
      realtime_tracking: z.string(),
      region: z.int(),
      rto_charges: z.float32(),
      rto_performance: z.float32(),
      seconds_left_for_pickup: z.int(),
      secure_shipment_disabled: z.boolean(),
      ship_type: z.int(),
      state: z.string(),
      suppress_date: z.string(),
      suppress_text: z.string(),
      suppression_dates: z.object({ action_on: z.string(), blocked_fm: z.string().optional(), blocked_lm: z.string().optional() }).nullable(),
      surface_max_weight: z.string(),
      tracking_performance: z.number(),
      volumetric_max_weight: z.number().nullable(),
      weight_cases: z.number().positive(),
      zone: z.string()

    })),
    child_courier_id: z.int().positive().nullable(),
    is_recommendation_enabled: z.number(),
    is_rocketExpress_shipment: z.number(),
    promise_recommended_courier_company_id: z.int().positive().positive().nullable(),
    recommendation_advance_rule: z.number(),
    recommendation_level: z.string(),
    recommended_by: z.object({
      id: z.int().positive(),
      title: z.string(),
    }).nullable(),
    recommended_courier_company_id: z.int().positive().nullable(),
    shiprocket_recommended_courier_id: z.int().positive().nullable(),
  }),
  dg_courier: z.int(),
  eligible_for_insurance: z.int(),
  insurace_opted_at_order_creation: z.boolean(),
  is_allow_templatized_pricing: z.boolean(),
  is_latlong: z.int(),
  is_old_zone_opted: z.boolean(),
  is_zone_from_mongo: z.boolean(),
  label_generate_type: z.int(),
  on_new_zone: z.int(),
  seller_address: z.array(z.any()),
  status: z.int().positive(),
  timestamp: z.string(),
  user_insurance_manadatory: z.boolean()

})
export const ShiprocketAuthResponseSchema = z.object({
  company_id: z.number().int().positive(),
  created_at: z.string(),
  email: z.email(),
  first_name: z.literal('API'),
  last_name: z.literal('USER'),
  id: z.number().int().positive(),
  token: z.jwt()
})
